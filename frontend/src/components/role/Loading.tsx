import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"

@Component
export default class RoleUserLoading extends Vue {
    render(): VNode {
        return <div class="skeleton__loader skeleton__loader--inline">
            <div class="wrap">
                <span class="text"></span>
            </div>
            <div class="action">
                <span class="link"></span>
                <span class="link"></span>
            </div>
        </div>
    }
}