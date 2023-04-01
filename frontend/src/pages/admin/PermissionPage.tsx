import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

import { Permission } from '@/store/modules/Permission'
import { ModalProp } from '@/store/modules/Root'
import PermissionForm from '@/components/permission/Form'
import PermissionItem from '@/components/permission/Item'
import Paginate from '@/components/pagination'
import { RequestQuery } from '@/interfaces/app'
import SearchBar from '@/components/SearchBar'
import PermissionLoading from '@/components/permission/Loading'
import ability from '@/services/ability'

@Component({
    computed: {
        ...mapGetters({
            permissionList: 'permission/permissionList',
            current: 'permission/currentPage',
            lastPage: 'permission/lastPage',
            isLoading: 'permission/isLoading'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal',
            fetch: 'permission/fetch',
            nextPage: 'permission/nextPage',
            prevPage: 'permission/prevPage',
            goto: 'permission/gotoPage',
            search: 'permission/search'
        })
    }
})
export default class PermissionPage extends Vue {
    private isLoading!: boolean

    private toggleModal!: (payload: ModalProp) => void
    private fetch!: (query: RequestQuery) => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private search!: (searchText: string) => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>
    private current!: number
    private lastPage!: number
    private permissionList!: Array<Permission>

    mounted() {
        this.fetch({ params: { per_page: 10 } })
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">Permission Page</h1>
                <div class="card__header__action">
                    <a href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        this.fetch({ params: { per_page: 10 } })
                    }}><span class="material-icons">refresh</span></a>
                    {ability.can('create_permission', 'all')
                        ? <a href="#" onClick={(event: MouseEvent) => {
                            event.preventDefault()

                            this.toggleModal({
                                title: 'Add new permission',
                                component: PermissionForm
                            })
                        }}><span class="fa fa-plus"></span> Add Permission</a>
                        : null
                    }
                </div>
            </header>
            <div class="card__body">
                <SearchBar onSearch={(searchText: string) => {
                    this.search(searchText)
                }} />
                {this.isLoading
                    ? <PermissionLoading />
                    : this.permissionList.map((permission: Permission) => <PermissionItem detail={permission} key={permission.id} />)
                }
            </div>
            <footer class="card__footer">
                <Paginate current={this.current} total={this.lastPage} onNext={() => this.nextPage()} onPrev={() => this.prevPage()} onGoto={(pageno: number) => this.goto(pageno)} />
            </footer>
        </section>
    }
}