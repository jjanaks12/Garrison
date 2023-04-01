import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import { mapActions } from 'vuex'
import Input from '@/components/Input'
import { Login } from '@/store/modules/Root'

@Component({
    methods: {
        ...mapActions({
            login: 'root/login'
        })
    }
})
export default class LoginPage extends Vue {
    private message: string | null = null
    private formData: Login = {
        // email: '',
        // password: '',
        email: 'admin@admin.com',
        password: 'password'
    }

    private login!: (formData: Login) => Promise<string>

    render(): VNode {
        return <section class="account__section">
            <div class="account__holder">
                <header class="account__header">
                    <h1>Welcome Back</h1>
                    <p>We have been expecting you</p>
                </header>
                <div class="account__body">
                    <form action="#" onSubmit={this.onFormSubmit} class="form">
                        <Input title="Email">
                            <input type="email" name='email' id='lf_email' v-model={this.formData.email} />
                        </Input>
                        <Input title="Password">
                            <input type="password" name='password' id='lf_password' v-model={this.formData.password} />
                        </Input>
                        <div class="form__action">
                            {this.message
                                ? <span class="form__message">{this.message}</span>
                                : null
                            }
                            <button type='submit' class="btn btn__primary">login</button>
                        </div>
                        <div class="form__links">
                            <p>Having problem with login? <router-link class="btn__link" to={{ name: 'forgot_password' }}>forgot password</router-link></p>
                        </div>
                    </form>
                    <div>
                        <p>Dont have Account? <router-link to={{ name: 'register' }} class="btn__link">sign up</router-link> here</p>
                    </div>
                </div>
            </div>
        </section>
    }

    onFormSubmit(event: Event) {
        event.preventDefault()

        this.login(this.formData)
            .then((message) => {
                if (message === 'success')
                    this.$router.push({ name: 'dashboard' })
                else
                    this.message = message
            })
    }
}