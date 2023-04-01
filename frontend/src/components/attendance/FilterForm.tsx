import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'
import Input from '../Input'
import moment from 'moment'
import { RequestParams } from '@/interfaces/app'

export interface FilterFormData extends RequestParams {
    time: Time
    per_page: number,
    date?: string,
    month?: Month
}

export enum Time {
    TODAY = "today",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    YEARLY = "yearly"
}

export enum Month {
    JANUARY = "January",
    FEBRUARY = "February",
    MARCH = "March",
    APRIL = "April",
    MAY = "May",
    JUNE = "June",
    JULY = "July",
    AUGUST = "August",
    SEPTEMBER = "September",
    OCTOBER = "October",
    NOVEMBER = "November",
    DECEMBER = "December"
}

const today = moment().local().format('YYYY-MM-DD')

@Component
export default class FilterForm extends Vue {
    private formData: FilterFormData = {
        time: Time.TODAY,
        per_page: 10
    }

    @Prop({ required: true }) value!: FilterFormData

    mounted() {
        if (this.value)
            this.formData = this.value
    }

    @Watch('data', { deep: true })
    dataWatcher() {
        if (this.value)
            this.formData = this.value
    }

    @Watch('formData', { deep: true })
    formDataWatcher() {
        this.$emit('input', this.formData)
    }

    render(): VNode {
        return <form class="form form__inline form__filter">
            <Input title="Time">
                <select name="time" v-model={this.formData.time}>
                    <option value="today">Today</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </Input>
            <Input title="Per page">
                <select name="per_page" v-model={this.formData.per_page}>
                    <option value="">Select one</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
            </Input>
            {this.formData.time === Time.MONTHLY
                ? <Input title="Month">
                    <select name='month' v-model={this.formData.month}>
                        {/* {Object.keys(Month).map((monthName: string) => <option value={monthName}>{monthName}</option>)} */}
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </Input>
                : null}
            {this.formData.time === Time.YEARLY
                ? <Input title="Date">
                    <input type="date" v-model={this.formData.date} max={today} />
                </Input>
                : null}
        </form>
    }
}