import { VNode } from 'vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import Nav from './partials/Nav'
import Modal from '@/components/PopModal.vue'
import { User } from '@/store/modules/User'

@Component({
    computed: {
        ...mapGetters({
            getLoggedinUser: 'root/getLoggedinUser'
        })
    },

    methods: {
        ...mapActions({
            logout: 'root/logout',
            fetchLogginedUser: 'root/fetchLogginedUser'
        })
    }
})
export default class AdminLayout extends Vue {
    private fetchLogginedUser!: () => Promise<boolean>
    private getLoggedinUser!: User | null

    @Watch('$route', { immediate: true })
    async onRouteChanged() {
        await this.init()
    }

    mounted() {
        this.init()
    }

    render(): VNode {
        return <div id='app' class="admin__layout">
            <Nav />
            <main id="main">
                <router-view key={new Date().getTime()} />
            </main>
            <Modal />
        </div >
    }

    async init() {
        if (!this.getLoggedinUser)
            this.fetchLogginedUser()
    }
}