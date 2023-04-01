import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mapActions } from 'vuex'

import { Permission } from '@/store/modules/Permission'
import PermissionForm from './Form'
import { ModalProp } from '@/store/modules/Root'

@Component({
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            destory: 'permission/destory',
        })
    }
})
export default class PermissionItem extends Vue {
    private toggleModal!: (payload: ModalProp) => void
    private destory!: (id: string) => void

    @Prop({ required: true }) detail!: Permission

    render(): VNode {
        return <div class="item">
            <div class="item__detail">
                <strong>{this.detail.title}</strong>
            </div>
            <div class="item__action">
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
            component: PermissionForm, props: { detail: this.detail }
        })
    }
}