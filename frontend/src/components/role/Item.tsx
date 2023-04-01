import { Role } from "@/store/modules/Role"
import { ModalProp } from "@/store/modules/Root"
import { VNode } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { mapActions } from "vuex"

import RoleForm from "./Form"
import AssignPermissionForm from './AssignPermissionForm'
import { Permission } from "@/store/modules/Permission"

@Component({
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            destory: 'role/destory',
        })
    }
})
export default class RoleItem extends Vue {
    private toggleModal!: (payload: ModalProp) => void
    private destory!: (id: string) => void

    @Prop({ required: true }) detail!: Role

    get permissions(): string {
        return this.detail.permissions
            ? this.detail.permissions.map((permission: Permission) => permission.title).join(', ')
            : ''
    }

    render(): VNode {
        return <div class="item">
            <div class="item__detail">
                <strong>{this.detail.title}</strong>
                <em class="list__string">{this.permissions}</em>
            </div>
            <div class="item__action">
                <a href="#" onClick={(event: Event) => {
                    event.preventDefault();

                    this.toggleModal({
                        title: `Edit <strong>${this.detail.title}</strong>`,
                        component: AssignPermissionForm,
                        props: {
                            roleId: this.detail.id,
                            permissions: this.detail.permissions
                                ? this.detail.permissions.map((permission: Permission) => permission.title)
                                : []
                        }
                    })
                }}>{this.detail.permissions?.length === 0 ? 'Assign Permission' : 'Update Permission'}</a>
                <a href="#" onClick={this.edit}>edit</a>
                <a href="#" onClick={(event: Event) => {
                    event.preventDefault()

                    if (this.detail.id)
                        this.destory(this.detail.id)
                }}>delete</a>
            </div>
        </div>
    }

    edit(event: Event) {
        event.preventDefault()

        this.toggleModal({
            title: `Edit <strong>${this.detail.title}</strong>`,
            component: RoleForm, props: { detail: this.detail }
        })
    }
}