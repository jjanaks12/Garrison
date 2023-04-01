import { Component, Prop, Vue } from "vue-property-decorator"
import { VNode } from "vue"

@Component
export default class CustomFileInput extends Vue {
    private fileList: Array<string> = []

    @Prop({ default: null }) value!: string | null

    get url(): string | null {
        if (this.fileList.length > 0)
            return this.fileList[0]

        return this.value
            ? this.value
            : null
    }

    render(): VNode {
        return <label class="custom__file">
            <input type="file" name="media" onChange={this.onInputChanged} accept="image/*" />
            <span class="custom__file__detail">
                {this.url
                    ? <img src={this.url} alt="image description" />
                    : <strong>Choose a file</strong>
                }
            </span>
        </label>
    }

    onInputChanged(event: Event) {
        const element = event.currentTarget as HTMLInputElement
        const fileList: FileList | null = element.files

        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                const file: File = fileList[i]
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = () => {
                    if (reader.result) {
                        this.fileList.push(reader.result as string)
                        this.$emit('input', this.fileList)
                    }
                }
            }
        }
    }
}