import { VNode } from "vue"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mapActions } from "vuex"

import Input from "../Input"
import { ModalProp } from "@/store/modules/Root"
import Role from "@/interfaces/Role"

@Component({
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            save: 'role/save'
        })
    }
})
export default class RoleForm extends Vue {
    private toggleModal!: (payload: ModalProp | null) => void
    private save!: (formData: Role) => Promise<boolean>

    private formData: Role = new Role()

    @Prop({ default: null }) detail!: Role | null

    @Watch('detail')
    onDetailChanged() {
        this.init()
    }

    mounted() {
        this.init()
    }

    render(): VNode {
        return <form class="form" onSubmit={(event: Event) => {
            event.preventDefault()
            this.save(this.formData)
                .then(() => {
                    this.toggleModal(null)
                })
        }}>
            <Input title="Title">
                <input type="text" name="title" id="pf_title" v-model={this.formData.title} />
            </Input>
            <div class="form__action">
                <button type="submit" class="btn btn__primary">save</button>
            </div>
        </form>
    }

    init() {
        if (this.detail) {
            this.formData.id = this.detail.id
            this.formData.title = this.detail.title
        }
    }
}