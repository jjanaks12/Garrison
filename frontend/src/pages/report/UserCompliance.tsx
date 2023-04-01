import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { mapActions, mapGetters } from "vuex"

import { UserCompliance } from '@/store/modules/Report'
import { RequestQuery } from "@/interfaces/app"
import Paginate from "@/components/pagination"
import UserLoading from "@/components/user/Loading"

@Component({
    computed: {
        ...mapGetters({
            current: 'user/currentPage',
            lastPage: 'user/lastPage',
            isLoading: 'user/isLoading'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'user/fetch',
            userCompliance: 'report/userCompliance',
            nextPage: 'user/nextPage',
            prevPage: 'user/prevPage',
            goto: 'user/gotoPage',
        })
    }
})
export default class UserComplianceReportPage extends Vue {
    private userCompliance!: () => Promise<Array<UserCompliance>>

    private isLoading!: boolean
    private current!: number
    private lastPage!: number
    private fetch!: (query: RequestQuery) => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    private complianceList: Array<UserCompliance> = []

    async mounted() {
        await this.fetch({ params: { per_page: 20 } })
        this.complianceList = await this.userCompliance()
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">User Compliance</h1>
            </header>
            <div class="card__body">
                {this.isLoading
                    ? <UserLoading />
                    : <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Name Added?</th>
                                <th>Email Verified?</th>
                                <th>Phone Verified?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.complianceList.map((user: UserCompliance) => <tr>
                                <td>{user.name}</td>
                                <td class={[user.name_added ? 'bg__success' : 'bg__danger', 'text-center']}>{user.name_added ? 'yes' : 'no'}</td>
                                <td class={[user.email_verified ? 'bg__success' : 'bg__danger', 'text-center']}>{user.email_verified ? 'yes' : 'no'}</td>
                                <td class={[user.phone_verified ? 'bg__success' : 'bg__danger', 'text-center']}>{user.phone_verified ? 'yes' : 'no'}</td>
                            </tr>)}
                        </tbody>
                    </table>
                }
            </div>
            <footer class="card__footer">
                <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            </footer>
        </section>
    }
}