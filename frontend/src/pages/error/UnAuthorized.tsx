import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"

@Component
export default class UnAuthorized extends Vue {
    render(): VNode {
        return <div>
            <h1>You cannot be here</h1>
            <p>Your are not suppose to see this page</p>
        </div>
    }
}