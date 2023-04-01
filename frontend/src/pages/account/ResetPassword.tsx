import { VNode } from "vue"
import { Component, Vue } from "vue-property-decorator"
import { mapActions } from "vuex"
import { AxiosError } from "axios"

import Input from "@/components/Input"
import { PasswordReset } from "@/store/modules/Root"

@Component({
    methods: {
        ...mapActions({
            resetPassword: 'root/resetPassword'
        })
    }
})
export default class ResetPassword extends Vue {
    private isLoading = false
    private message: string | null = null
    private formData: PasswordReset = {
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    private resetPassword!: (formData: PasswordReset) => Promise<boolean | AxiosError>

    mounted() {
        if (this.$route.query) {
            this.formData.email = this.$route.query.email.toString()
            this.formData.token = this.$route.query.token.toString()
        }
    }

    render(): VNode {
        return <section class="account__section">
            <div class="account__holder">
                <header class="account__header">
                    <router-link to={{ name: 'login' }} class="btn btn__info btn__xs">back to login</router-link>
                    <h1>Forgot password?</h1>
                    <p>Just give us your email, we will send a link via email and the you can reset password</p>
                </header>
                <div class="account__body">
                    <form action="#" onSubmit={this.onFormSubmit} class="form">
                        <Input title="Email">
                            <input type="email" name='email' id='lf_email' v-model={this.formData.email} readonly />
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
                            <button type='submit' class={{ "btn btn__primary": true, 'loading': this.isLoading }}>send</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    }

    onFormSubmit(event: Event) {
        event.preventDefault()
        this.isLoading = true

        this.resetPassword(this.formData)
            .then((data: boolean | AxiosError) => {

                if (typeof data != 'boolean') {
                    if (data.status === 'Error')
                        this.message = data.message
                } else {
                    this.$router.push({
                        name: 'login', params: {
                            email: this.formData.email
                        }
                    })
                }
            })
            .finally(() => {
                this.isLoading = false
            })
    }
}