import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions } from "vuex"

import Input from "@/components/Input"
import { Register } from "@/store/modules/Root"

@Component({
    methods: {
        ...mapActions({
            register: 'root/register'
        })
    }
})
export default class RegisterPage extends Vue {
    private formData: Register = {
        email: '',
        password: '',
        password_confirmation: ''
    }
    private message: string | null = null
    private register!: (formData: Register) => Promise<string>

    render(): VNode {
        return <section class="account__section">
            <div class="account__holder">
                <header class="account__header">
                    <h1>Join Us?</h1>
                    <p>Its easy, just start with your email and password.</p>
                </header>
                <div class="account__body">
                    <form action="#" onSubmit={this.onFormSubmit} class="form">
                        <Input title="Email">
                            <input type="email" name='email' id='lf_email' v-model={this.formData.email} />
                        </Input>
                        <Input title="Password">
                            <input type="password" name='password' id='lf_password' v-model={this.formData.password} />
                        </Input>
                        <Input title="Password Confirmation">
                            <input type="password" name='password_confirmation' id='lf_password_confirmation' v-model={this.formData.password_confirmation} />
                        </Input>
                        <div class="form__action">
                            {this.message
                                ? <span class="form__message">{this.message}</span>
                                : null
                            }
                            <button type='submit' class="btn btn__primary">login</button>
                        </div>
                    </form>
                    <div>
                        <p>Already have Account? <router-link to={{ name: 'login' }} class="btn__link">sign in</router-link> here</p>
                    </div>
                </div>
            </div>
        </section>
    }

    onFormSubmit(event: Event) {
        event.preventDefault()

        this.register(this.formData)
            .then((message) => {
                if (message === 'success')
                    this.$router.push({ name: 'dashboard' })
                else
                    this.message = message
            })
    }
}