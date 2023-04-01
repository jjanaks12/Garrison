import { Vue, Component } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mapActions, mapGetters } from 'vuex'

import { RequestQuery } from '@/interfaces/app'
import { Attendance } from '@/store/modules/Root'
import FilterForm, { FilterFormData, Month, Time } from '@/components/attendance/FilterForm'
import Paginate from '@/components/pagination'
import { format } from '@/core/helpers'
import moment from 'moment'

@Component({
    computed: {
        ...mapGetters({
            attendanceList: 'attendance/attendanceList',
            current: 'attendance/currentPage',
            lastPage: 'attendance/lastPage',
            isLoading: 'attendance/isLoading'
        })
    },
    methods: {
        ...mapActions({
            fetch: 'attendance/fetch',
            nextPage: 'attendance/nextPage',
            prevPage: 'attendance/prevPage',
            goto: 'attendance/gotoPage',
        })
    }
})
export default class AttendacePage extends Vue {
    private isLoading!: boolean

    private fetch!: (query: RequestQuery) => Promise<boolean>
    private prevPage!: () => Promise<boolean>
    private nextPage!: () => Promise<boolean>
    private goto!: (pageno: number) => Promise<boolean>
    private current!: number
    private lastPage!: number
    private attendanceList!: Array<Attendance>

    private filterFormData: FilterFormData = {
        time: Time.MONTHLY,
        per_page: 10,
        month: Month.MARCH
    }

    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">Attendance Page</h1>
            </header>
            <div class="card__body">
                <FilterForm v-model={this.filterFormData} onInput={() => { this.fetch({ params: this.filterFormData }) }} />
                {this.isLoading
                    ? 'loading...'
                    : <table class="table">
                        <thead>
                            <tr>
                                {(this.attendanceList[0] || {}).user
                                    ? <td>Name</td>
                                    : null}
                                <th>Checkin</th>
                                <th>Checkout</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.attendanceList.map((attendace: Attendance) => <tr>
                                {attendace.user
                                    ? <td>{attendace.user?.name}</td>
                                    : null}
                                <td>{format(attendace.checkin)}</td>
                                <td>{format(attendace.checkout)}</td>
                                <td>{this.totalWorkedHrs(attendace.checkin, attendace.checkout)}</td>
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


    totalWorkedHrs(start: string, end: string): string {
        let hr = ''

        if (start && end) {
            const a = moment(end).diff(moment(start), 'hours')
            const b = moment(end).diff(moment(start), 'minutes')

            hr = a + 'hr' + (a > 1 ? 's' : '') + ' and ' + (b % 60) + 'min' + (b > 1 ? 's' : '')
        }

        return hr
    }
}
