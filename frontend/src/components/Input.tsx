import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class Input extends Vue {
    private isFocus = false
    private hasText = false

    @Prop({ default: '' }) title!: string
    @Prop({ default: false }) disabled!: boolean

    render(): VNode {
        return <div class={{ "form__group": true, "has--text": this.isFocus || this.hasText }}>
            {this.title
                ? <label for="">{this.title}</label>
                : null
            }
            {this.$slots.default}
        </div>
    }

    mounted() {
        const input: HTMLInputElement | null = this.$el.querySelector('input, select')

        if (input) {
            this.$nextTick(() => {
                this.hasText = input.value !== ''
            })

            input.addEventListener('focus', () => {
                this.isFocus = true
            })

            input.addEventListener('blur', () => {
                this.isFocus = false
            })

            input.addEventListener('input', () => {
                this.hasText = input.value.length > 0
            })

            if (this.disabled)
                input.setAttribute('disabled', '')
        }
    }
}