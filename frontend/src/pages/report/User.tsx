import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'

import UserChart from "@/components/user/Chart"

@Component
export default class UserReportPage extends Vue {
    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">User joined report</h1>
            </header>
            <div class="card__body">
                <div class="card__detail">
                    <UserChart />
                </div>
            </div>
        </section>
    }
}