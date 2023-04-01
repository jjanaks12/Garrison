import { VNode } from "vue"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapActions, mapGetters } from "vuex"

import { ModalProp } from "@/store/modules/Root"
import { User } from "@/store/modules/User"
import AssignRoleForm from './AssignRoleForm'
import ability from "@/services/ability"
import UserDetail from './Detail'
import { Role } from "@/store/modules/Role"

@Component({
    computed: {
        ...mapGetters({
            myRole: 'root/myRole'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            destory: 'user/destory',
        })
    }
})
export default class UserItem extends Vue {
    private toggleModal!: (payload: ModalProp) => void
    private destory!: (id: string) => void
    private myRole!: Role

    hasHigherRole = false

    @Prop({ required: true }) detail!: User

    @Watch('myRole', { deep: true })
    onMyRoleChanged() {
        this.init()
    }

    get roles(): string {
        return this.detail.roles
            ? this.detail.roles.map(role => role.title).join(', ')
            : ''
    }

    get roleId(): string | null {
        return this.detail.roles
            ? this.detail.roles[0]
                ? this.detail.roles[0].id ?? null
                : null
            : null
    }

    get abbr(): string {
        return this.detail.name
            ? this.detail.name.split(' ').map(name => name[0]).join('')
            : this.detail.email[0]
    }

    mounted() {
        this.init()
    }

    init() {
        if (this.detail.roles && this.detail.roles.length > 0) {
            const role = this.detail.roles[0]

            if (role.priority !== undefined && this.myRole.priority !== undefined) {

                this.hasHigherRole = this.myRole.priority < role.priority
            }
        }
    }

    render(): VNode {
        return <div class="item">
            <figure class="item__image">
                {this.detail?.media
                    ? <img src={this.detail.media.url} alt={this.detail.name} />
                    : <span>{this.abbr}</span>
                }
            </figure>
            <div class="item__detail">
                <h3 class="h6">
                    {ability.can('view_user', 'all')
                        ? <a href="#" onClick={(event: Event) => {
                            event.preventDefault()

                            this.toggleModal({
                                title: `Detail of <strong>${this.detail.email}</strong>`,
                                component: UserDetail,
                                props: {
                                    detail: this.detail
                                }
                            })
                        }}>{this.detail.name ? this.detail.name : this.detail.email}</a>
                        : this.detail.email
                    }
                </h3>
                <em class="list__string">{this.roles}</em>
            </div>
            <div class="item__action">
                {ability.can('change_role', 'all') && (this.hasHigherRole || !this.roleId)
                    ? <a href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        if (this.detail.id)
                            this.toggleModal({
                                title: `<hi>Assign role to <strong>${this.detail.email}</strong></hi>`,
                                component: AssignRoleForm,
                                props: {
                                    userId: this.detail.id,
                                    roleId: this.roleId
                                }
                            })
                    }}>{this.detail.roles && this.detail.roles.length > 0 ? 'Update role' : 'Assign role'}</a>
                    : null
                }

                {ability.can('delete_user', 'all') && this.hasHigherRole
                    ? <a href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        if (this.detail.id)
                            this.destory(this.detail.id)
                    }}>delete</a>
                    : null
                }
            </div>
        </div>
    }
}