import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"

import Input from "../Input"
import { ModalProp } from "@/store/modules/Root"
import { Role } from "@/store/modules/Role"
import { AssignRolePayload } from '@/store/modules/User'
import { RequestQuery } from "@/interfaces/app"

@Component({
    computed: {
        ...mapGetters({
            list: 'role/list'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            fetchRole: 'role/fetch',
            assignRole: 'user/assignRole'
        })
    }
})
export default class AssignRoleForm extends Vue {
    private toggleModal!: (payload: ModalProp | null) => void
    private list!: Array<Role>
    private fetchRole!: (query: RequestQuery) => Promise<boolean>
    private assignRole!: (payload: AssignRolePayload) => Promise<boolean>

    private role = ''

    @Prop({ required: true }) userId!: string
    @Prop({ default: null }) roleId!: string | null

    async mounted() {
        await this.fetchRole({
            params: {
                per_page: null
            }
        })

        this.role = this.roleId ?? ''
    }

    get hasChanged(): boolean {
        return this.role === '' || this.role !== this.roleId
    }

    render(): VNode {
        return <form class="form" onSubmit={this.formSubmit}>
            <Input>
                <select v-model={this.role}>
                    <option value="">Select an role</option>
                    {this.list.map((role: Role) => <option selected={role.id === this.roleId} value={role.id}>{role.title}</option>)}
                </select>
            </Input>
            <div class="form__action">
                <button type="submit" disabled={!this.hasChanged} class="btn btn__primary">Save</button>
            </div>
        </form>
    }

    formSubmit(event: Event) {
        event.preventDefault()

        if (this.role)
            this.assignRole({
                userID: this.userId,
                roleID: this.role
            })
                .then(() => {
                    this.toggleModal(null)
                })
    }
}