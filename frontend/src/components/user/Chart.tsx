import { CategoryScale, Chart, ChartConfiguration, Legend, LinearScale, LineController, LineElement, PointElement, Tooltip } from "chart.js"
import { VNode } from "vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import { mapActions } from "vuex"

import { Timely, ReportParam } from '@/store/modules/Report'
import Input from '@/components/Input'

Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement, Legend, Tooltip)
let chart: Chart
const colors = ['rgb(128,76,62)', 'rgb(255,255,0)', 'rgb(154,205,50)', 'rgb(7,75,191)', 'rgb(0,255,154)', 'rgb(124,252,0)', 'rgb(127,255,0)', 'rgb(173,255,47)', 'rgb(0,100,0)', 'rgb(0,128,0)', 'rgb(34,139,34)', 'rgb(0,255,0)', 'rgb(50,205,50)', 'rgb(144,238,144)', 'rgb(152,251,152)', 'rgb(143,188,143)', 'rgb(0,250,154)', 'rgb(0,255,127)', 'rgb(46,139,87)', 'rgb(102,205,170)', 'rgb(60,179,113)']
const monthNameList = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const config: ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [{
            data: [1, 2]
        }]
    },
    options: {
        responsive: true,
        interaction: {
            intersect: true
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                // suggestedMin: 0,
                // suggestedMax: 10
            }
        }
    }
}

interface Data {
    [propname: string]: number | Data
}

@Component({
    methods: {
        ...mapActions({
            report: 'report/userReport'
        })
    }
})
export default class UserChart extends Vue {
    private report!: (params: ReportParam) => Promise<Data | Array<Data>>
    private filter: Timely = Timely.MONTHLY
    private start_date = '2022-10-02'
    private end_date = '2022-10-02'

    private list: Data = {}

    @Watch('filter')
    @Watch('start_date')
    @Watch('end_date')
    async onFilterChanged() {
        this.init()
    }

    mounted() {
        const chartElement: HTMLCanvasElement | undefined = this.$refs.chart as HTMLCanvasElement
        chart = new Chart(chartElement, config)

        this.init()
    }

    render(): VNode {
        return <section class="chart">
            <header class="chart__header">
                <a href="#" onClick={(event: Event) => {
                    event.preventDefault()

                    this.init()
                }}>refresh</a>
            </header>
            <div>
                <form action="#" class="form form__inline mb-4">
                    <Input>
                        <select v-model={this.filter}>
                            {Object.keys(Timely).map(key => <option value={Timely[key as keyof typeof Timely]}>{key}</option>)}
                        </select>
                    </Input>
                    <Input title="Start Date">
                        <input type="date" v-model={this.start_date} />
                    </Input>
                    <Input title="End Date">
                        <input type="date" v-model={this.end_date} />
                    </Input>
                </form>
                <canvas ref="chart" />
            </div>
        </section>
    }

    async init() {
        this.list = await this.report({
            filter: this.filter,
            start_date: this.start_date,
            end_date: this.end_date
        }) as Data

        if (this.filter === Timely.YEARLY) {
            chart.data.labels = Object.keys(this.list)
            chart.data.datasets = [{
                label: 'New Users On 2022',
                data: Object.values(this.list) as Array<number>,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(23 165 23)',
                cubicInterpolationMode: 'monotone',
                tension: 1
            }]
        } else {
            chart.data.datasets = []

            Object.keys(this.list).forEach((year: string, index: number) => {
                const backgroundColor = colors[index]

                chart.data.labels = monthNameList
                chart.data.datasets.push({
                    data: Object.values(this.list[year]) as Array<number>,
                    backgroundColor,
                    borderColor: backgroundColor,
                    label: year,
                    fill: backgroundColor,
                    cubicInterpolationMode: 'monotone',
                    tension: 1
                })
            })
        }

        chart.update()
    }
}