import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'

import Attendace from '@/components/attendance/Index'
import ability from '@/services/ability'

@Component({
    methods: {
        ...mapActions({
            fetchMe: 'root/fetchLogginedUser'
        })
    }
})
export default class DashboardPage extends Vue {
    private fetchMe!: () => Promise<boolean>

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1>Dashboard Page</h1>
            </header>
            <div class="card__body">
                <div class="card__detail">
                    {ability.can('do_attendance', 'all')
                        ? <Attendace />
                        : null}
                    <a class="btn__link" href="#" onClick={(event: Event) => {
                        event.preventDefault()

                        this.fetchMe()
                    }}>get my latest detail</a>
                </div>
            </div>
        </section>
    }
}