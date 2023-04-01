import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"

import { User } from '@/store/modules/User'
import Input from "@/components/Input"
import { AxiosError } from 'axios';
import CustomFileInput from "@/components/CustomFileInput"
import { Image } from "@/store/modules/Root"

@Component({
    computed: {
        ...mapGetters({
            user: 'root/getLoggedinUser',
            avatar: 'root/avatar'
        })
    },
    methods: {
        ...mapActions({
            changeDetail: 'root/changeDetail'
        })
    }
})
export default class ChangeDetail extends Vue {
    private user!: User
    private message: string | null = null
    private changeDetail!: (formData: User) => Promise<boolean | AxiosError>
    private avatar!: Image
    private formData: User = {
        file: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    }

    mounted() {
        const { email, phone, name, address } = this.user
        this.formData = { email, phone, name, address }
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1>Change Detail</h1>
            </header>
            <div class="card__body">
                <div class="card__detail">
                    <form class="form" onSubmit={this.onFormSubmit}>
                        <CustomFileInput value={this.avatar?.url} onInput={(fileList: Array<string>) => {
                            this.formData.file = fileList[fileList.length - 1]
                        }} />
                        <Input title="Name">
                            <input type="text" name='name' id='lf_name' v-model={this.formData.name} />
                        </Input>
                        <Input title="Phone number">
                            <input type="text" name='name' id='lf_name' v-model={this.formData.phone} />
                        </Input>
                        <Input title="Email">
                            <input type="email" name='email' id='lf_email' v-model={this.formData.email} readonly />
                        </Input>
                        <Input title="Address">
                            <input type="text" name='address' id='lf_address' v-model={this.formData.address} />
                        </Input>
                        <div class="form__action">
                            {this.message
                                ? <span class="form__message">{this.message}</span>
                                : null
                            }
                            <button class="btn btn__primary" type="submit">Save</button>
                        </div>
                    </form>
                    {/* <div class="message text--info">
                        <p>Once you add your email it cannot be changed</p>
                    </div> */}
                </div>
            </div>
        </section>
    }

    onFormSubmit(event: Event) {
        event.preventDefault()

        this.changeDetail(this.formData)
            .then((data: boolean | AxiosError) => {

                if (typeof data !== 'boolean')
                    this.message = data.message
                else
                    if (data)
                        this.$router.push({ name: 'setting' })
            })
    }
}