import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { ModalProp } from '@/store/modules/Root'
import { Role } from '@/store/modules/Role'
import RoleForm from '@/components/role/Form'
import RoleItem from '@/components/role/Item'
import { RequestQuery } from '@/interfaces/app'
import SearchBar from '@/components/SearchBar'
import RoleUserLoading from '../../components/role/Loading';
import Paginate from '@/components/pagination'

@Component({
    computed: {
        ...mapGetters({
            list: 'role/list',
            current: 'role/currentPage',
            lastPage: 'role/lastPage',
            isLoading: 'role/isLoading'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            fetch: 'role/fetch',
            nextPage: 'role/nextPage',
            prevPage: 'role/prevPage',
            goto: 'role/gotoPage',
            search: 'role/search'
        })
    }
})
export default class RolesPage extends Vue {
    private toggleModal!: (payload: ModalProp) => void
    private isLoading!: boolean
    private list!: Array<Role>
    private current!: number
    private lastPage!: number
    private fetch!: (query: RequestQuery) => Promise<boolean>
    private search!: (searchText: string) => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>

    mounted() {
        this.fetch({
            params: {
                per_page: 10
            }
        })
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">Role Page</h1>
                <div class="card__header__action">
                    <a href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        this.fetch({ params: { per_page: 10 } })
                    }}><span class="material-icons">refresh</span></a>
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.toggleModal({
                            title: 'Add new Role',
                            component: RoleForm
                        })
                    }}>Add Role</a>
                </div>
            </header>
            <div class="card__body">
                <SearchBar onSearch={(searchText: string) => {
                    this.search(searchText)
                }} />
                {this.isLoading
                    ? <RoleUserLoading />
                    : this.list.map((role: Role) => <RoleItem detail={role} key={role.id} />)
                }
            </div>
            <footer class="card__footer">
                <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            </footer>
        </section>
    }
}