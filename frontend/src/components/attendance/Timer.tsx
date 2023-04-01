import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'
import moment from 'moment'

let timer: number

@Component
export default class Timer extends Vue {
    private hour = 0
    private minute = 0
    private seccond = 0

    @Prop() startTime!: string
    @Prop() endTime!: string

    @Watch("startTime")
    startTimeWatcher() {
        if (!this.startTime)
            return

        this.startWatch()
    }

    @Watch("endTime")
    endTimeWatcher() {
        if (this.endTime) {
            clearInterval(timer)
            this.finalTimer()
        }
    }

    render(): VNode {
        return <div class="timer">
            <span class="timer__unit"><span>{this.hour.toString().padStart(2, '0')}</span> hour{this.hour > 1 ? 's' : ''}</span>
            <span class="timer__unit"><span>{this.minute.toString().padStart(2, '0')}</span> minute{this.minute > 1 ? 's' : ''}</span>
            <span class="timer__unit"><span>{this.seccond.toString().padStart(2, '0')}</span> second{this.seccond > 1 ? 's' : ''}</span>
        </div>
    }

    startWatch() {
        const startTime = moment.utc(this.startTime).local()

        timer = setInterval(() => {

            this.hour = moment().diff(startTime, "hours") % 24
            this.minute = moment().diff(startTime, "minutes") % 60
            this.seccond = moment().diff(startTime, "seconds") % 60
        }, 1000)
    }

    finalTimer() {
        const startTime = moment.utc(this.startTime).local()
        const endTime = moment.utc(this.endTime).local()

        this.hour = endTime.diff(startTime, "hours") % 24
        this.minute = endTime.diff(startTime, "minutes") % 60
        this.seccond = endTime.diff(startTime, "seconds") % 60
    }
}
