import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { mapActions } from "vuex"
import { AxiosError } from "axios"

import Input from "@/components/Input"

@Component({
    methods: {
        ...mapActions({
            forgetPassword: 'root/forgetPassword'
        })
    }
})
export default class ForgotPassword extends Vue {
    private isLoading = false
    private message: string | null = null
    private email = ''

    private forgetPassword!: (email: string) => Promise<boolean | AxiosError>

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
                        <Input title="Your Email here">
                            <input type="email" name='email' id='lf_email' v-model={this.email} />
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

        this.forgetPassword(this.email)
            .then((data: boolean | AxiosError) => {

                if (typeof data != 'boolean') {
                    if (data.status === 'Error')
                        this.message = data.message
                } else {
                    this.message = null
                }
            })
            .finally(() => {
                this.isLoading = false
            })
    }
}