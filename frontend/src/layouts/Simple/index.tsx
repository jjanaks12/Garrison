import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SimpleLayout extends Vue {
    render(): VNode {
        return <div id="wrapper" class="simple__layout">
            <main id="main">
                <router-view />
            </main>
        </div>
    }
}