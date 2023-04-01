import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { mapActions, mapGetters } from "vuex"

import { User } from "@/store/modules/User"
import UserItem from '@/components/user/Item'
import SearchBar from '@/components/SearchBar'
import { RequestQuery } from "@/interfaces/app"
import Paginate from "@/components/pagination"
import UserLoading from "@/components/user/Loading"

@Component({
    computed: {
        ...mapGetters({
            list: 'user/list',
            current: 'user/currentPage',
            lastPage: 'user/lastPage',
            isLoading: 'user/isLoading'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'user/fetch',
            nextPage: 'user/nextPage',
            prevPage: 'user/prevPage',
            goto: 'user/gotoPage',
            search: 'user/search'
        })
    }
})
export default class UserPage extends Vue {
    private isLoading!: boolean
    private list!: Array<User>
    private current!: number
    private lastPage!: number
    private fetch!: (query: RequestQuery) => Promise<boolean>
    private search!: (searchText: string) => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    mounted() {
        this.fetch({ params: { per_page: 10 } })
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">Users</h1>
                <div class="card__header__action">
                    <a href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        this.fetch({ params: { per_page: 10 } })
                    }}><span class="material-icons">refresh</span></a>
                </div>
            </header>
            <div class="card__body">
                <SearchBar onSearch={(searchText: string) => {
                    this.search(searchText)
                }} />
                 {this.isLoading
                    ? <UserLoading />
                    : this.list.map((user: User) => <UserItem detail={user} key={user.id} />)
                }
            </div>
            <footer class="card__footer">
                <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            </footer>
        </section>
    }
}