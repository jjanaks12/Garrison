import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"
import { User } from "@/store/modules/User"

@Component
export default class UserDetail extends Vue {
    @Prop({ required: true }) detail!: User

    render(): VNode {
        return <dl>
            <dt>Name:</dt>
            <dd>{this.detail.name}</dd>
            <dt>Phone:</dt>
            <dd>{this.detail.phone}</dd>
            <dt>email:</dt>
            <dd>{this.detail.email}</dd>
            <dt>address:</dt>
            <dd>{this.detail.address}</dd>
        </dl>
    }
}