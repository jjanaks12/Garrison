import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Paginate extends Vue {
    @Prop({ required: true }) current!: number
    @Prop({ required: true }) total!: number
    @Prop({ default: 3 }) max!: number

    get pages(): Array<number> {
        let length = this.max

        if (length > this.total)
            length = this.total;

        let start = this.current - Math.floor(length / 2)
        start = Math.max(start, 1)
        start = Math.min(start, 1 + this.total - length)

        return Array.from({ length: length }, (_, i) => start + i)
    }

    /** 
     * 
     * @returns VNode
     */
    render(): VNode {
        return (<nav class="pagination">
            {this.total > 1
                ? [
                    <ul class="pagination__list">
                        {this.current > 1 ? <li><a href="#" class="pagination--btn prev" onClick={this.prev}>prev</a></li> : null}
                        {this.pages.map((pageno: number) => <li>
                            {pageno === this.current
                                ? <strong>{pageno}</strong>
                                : <a href="#" onClick={(event: MouseEvent) => { event.preventDefault(); this.goto(pageno) }}>{pageno}</a>}
                        </li>)}
                        {this.current < this.total ? <li><a href="#" class="pagination--btn next" onClick={this.next}>next</a></li> : null}
                    </ul>,
                    // <span>{this.current}/{this.total}</span>
                ]
                : null}
        </nav>)
    }

    next(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('next')
    }

    prev(event: MouseEvent): void {
        event.preventDefault()
        this.$emit('prev')
    }

    goto(pageNo: number): void {
        this.$emit('goto', pageNo)
    }
}