import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import Input from "@/components/Input"
import { Password } from "@/store/modules/Root"
import { mapActions } from "vuex"

@Component({
    methods: {
        ...mapActions({
            changePassword: 'root/changePassword'
        })
    }
})
export default class ChnagePassword extends Vue {
    changePassword!: (payload: Password) => Promise<boolean>
    private formData: Password = {
        password: '',
        password_confirmation: ''
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1>Change Password</h1>
            </header>
            <div class="card__body">
                <div class="card__detail">
                    <form action="#" class="form" onSubmit={this.onFormSubmit}>
                        <Input title="Password">
                            <input type="password" name='password' id='lf_password' v-model={this.formData.password} />
                        </Input>
                        <Input title="Password Confirmation">
                            <input type="password" name='password_confirmation' id='lf_password_confirmation' v-model={this.formData.password_confirmation} />
                        </Input>
                        <div class="form__action">
                            <button class="btn btn__primary" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    }

    onFormSubmit(event: Event) {
        event.preventDefault()

        this.changePassword(this.formData)
            .then(() => {
                this.$router.push({ name: 'setting' })
            })
    }
}