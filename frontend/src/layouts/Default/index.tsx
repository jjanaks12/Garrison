import InstallPWA from '@/components/InstallPWA'
import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            'token': 'root/getToken'
        })
    }
})
export default class DefaultLayout extends Vue {
    private token!: string

    render(): VNode {
        return <div id="wrapper" class="default__layout">
            <nav id="nav">
                <router-link to={{ name: 'home' }}>Home</router-link>
                {this.token
                    ? [
                        <router-link to={{ name: 'dashboard' }}>Dashboard</router-link>
                    ]
                    : [
                        <router-link to={{ name: 'login' }}>login</router-link>
                    ]}
            </nav>
            <main id="main">
                <router-view />
            </main>
            <InstallPWA />
        </div>
    }
}