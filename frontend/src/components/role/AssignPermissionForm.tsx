import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"

import { ModalProp } from "@/store/modules/Root"
import { Permission } from "@/store/modules/Permission"
import { AssignPermissionPayload } from "@/store/modules/Role"
import { RequestQuery } from "@/interfaces/app"
import Input from "../Input"

@Component({
    computed: {
        ...mapGetters({
            list: 'permission/permissionList'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            fetchPermission: 'permission/fetch',
            assignPermission: 'role/assignPermission'
        })
    }
})
export default class AssignPermissionForm extends Vue {
    private toggleModal!: (payload: ModalProp | null) => void
    private list!: Array<Permission>
    private fetchPermission!: (query: RequestQuery) => Promise<boolean>
    private assignPermission!: (payload: AssignPermissionPayload) => Promise<boolean>

    private permissionList: Array<string> = []
    private searchText = ''

    @Prop({ default: () => [] }) permissions!: Array<string>
    @Prop({ required: true }) roleId!: string

    async mounted() {
        await this.fetchPermission({
            params: {
                per_page: null
            }
        })

        if (this.permissions.length > 0)
            this.permissions.forEach(permissionTitle => {
                const foundPermission: Permission = this.list.find((permission: Permission) => permission.title === permissionTitle) as Permission

                if (foundPermission && foundPermission.id)
                    this.permissionList.push(foundPermission.id)
            })
    }

    get hasChanged(): boolean {
        return this.permissionList.length > 0 || this.permissionList.length !== this.permissions.length
    }

    get filterList(): Array<Permission> {
        return this.list.filter((permission: Permission) => permission.title.toLowerCase().includes(this.searchText.toLowerCase()))
    }

    render(): VNode {
        return <form class="form" onSubmit={this.formSubmit}>
            <div class="form__action">
                <Input title="saerch permission..." >
                    <input type="search" v-model={this.searchText} />
                </Input>
                <div class="holder">
                    <button type="button" onClick={this.selectAll} class="btn__link">select All</button>
                    <button type="button" onClick={this.deSelectAll} class="btn__link">Deselect All</button>
                </div>
            </div>
            <div class="checkbox__list">
                {this.filterList.map((permission: Permission) => <label class={{ "checkbox": true, "checkbox--checked": this.permissionList.includes(permission.id || '') }}>
                    <input type="checkbox" name="permission" value={permission.id} v-model={this.permissionList} />
                    <span class="checkbox__text">{permission.title}</span>
                </label>)}
            </div>
            <div class="form__action">
                <button type="submit" disabled={!this.hasChanged} class="btn btn__primary">Save</button>
            </div>
        </form>
    }

    formSubmit(event: Event) {
        event.preventDefault()

        if (this.permissionList.length > 0)
            this.assignPermission({
                roleId: this.roleId,
                permissions: this.permissionList
            })
                .then(() => {
                    this.toggleModal(null)
                })
    }

    selectAll() {
        this.permissionList = []

        this.list.forEach((permission: Permission) => {
            if (permission.id)
                this.permissionList.push(permission.id)
        })
    }

    deSelectAll() {
        this.permissionList = []
    }
}