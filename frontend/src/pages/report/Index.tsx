import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'

@Component
export default class ReportPage extends Vue {
    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1 class="card__title">Report page</h1>
            </header>
            <div class="card__body">
                <div class="card__detail"></div>
            </div>
        </section>
    }
}