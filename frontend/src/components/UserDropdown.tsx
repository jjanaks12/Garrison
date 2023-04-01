import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { User } from '@/store/modules/User'
import { Image } from '@/store/modules/Root'

@Component({
    computed: {
        ...mapGetters({
            user: 'root/getLoggedinUser',
            avatar: 'root/avatar'
        })
    },
    methods: {
        ...mapActions({
            logout: 'root/logout'
        })
    }
})
export default class UserDropdown extends Vue {
    private logout!: () => Promise<boolean>
    private user!: User
    private avatar!: Image

    render(): VNode {
        return <div class="user">
            <router-link to={{ name: 'setting.change_detail' }} class="user__image">
                {this.avatar
                    ? <img src={this.avatar.url} alt={this.user.name} />
                    : <span>{this.userAbbr}</span>
                }
            </router-link>
            <div class="user__detail">
                <em>{this.user.email}</em>
                <a href="#" class="btn__logout" onClick={(event: MouseEvent) => {
                    event.preventDefault()

                    this.logout()
                        .then(() => {
                            this.$router.push({ name: 'login' })
                        })
                }}>logout <span class="material-icons">logout</span></a>
            </div>
        </div>
    }

    get userAbbr(): string {
        return this.user
            ? this.user.name
                ? this.user.name.split(' ').map(name => name[0]).join('')
                : (this.user.email || '')[0]
            : ''
    }
}