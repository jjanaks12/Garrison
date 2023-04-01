import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {
    render(): VNode {
        return <div>Home Page</div>
    }
}