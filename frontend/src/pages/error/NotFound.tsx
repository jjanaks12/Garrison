import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotFound extends Vue {
    render(): VNode {
        return <div>
            <h1>Page Not Found</h1>
            <p>We dont have this page</p>
        </div>
    }
}