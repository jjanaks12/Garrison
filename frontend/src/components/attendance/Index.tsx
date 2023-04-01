import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { AxiosError } from 'axios'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

import ability from '@/services/ability'
import { Attendance } from '@/store/modules/Root'
import Timer from './Timer'

@Component({
    computed: {
        ...mapGetters({
        })
    },
    methods: {
        ...mapActions({
            todayAttendance: 'root/todayAttendance',
            doAttendance: 'root/doAttendance'
        })
    }
})
export default class AttendaceCard extends Vue {
    private todayAttendance!: () => Promise<Attendance | AxiosError>
    private doAttendance!: () => Promise<boolean | AxiosError>
    private attendance?: Attendance | null = null

    mounted() {
        this.init()
    }

    async init() {
        const a: Attendance | AxiosError = await this.todayAttendance()

        if (!(a instanceof AxiosError))
            this.attendance = a
    }

    render(): VNode {
        return <div class="attendance__widget">
            {this.attendance?.checkin
                ? <strong class="attendance__widget__title">checked in at {moment.utc(this.attendance.checkin).local().format("hh:mm a")}</strong>
                : null}
            {this.attendance?.checkout
                ? <strong class="attendance__widget__title">checked out at {moment.utc(this.attendance.checkout).local().format("hh:mm a")}</strong>
                : null}

            <Timer start-time={this.attendance?.checkin} end-time={this.attendance?.checkout} />

            {ability.can('do_attendance', 'all') && !this.attendance?.checkout
                ? <a href="#" class="attendance__widget__btn" onClick={(event: MouseEvent) => {
                    event.preventDefault()
                    this.doAttendance()
                        .then(() => {
                            this.init()
                        })
                }}>{this.attendance
                    ? "check out"
                    : "check in"}</a>
                : null}
        </div>
    }
}