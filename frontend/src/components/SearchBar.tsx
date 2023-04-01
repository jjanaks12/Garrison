import { Component, Vue, Watch } from "vue-property-decorator"
import { VNode } from "vue"
import Input from "./Input"

let timer: number

@Component
export default class SearchBar extends Vue {
    private searchText = ''

    @Watch('searchText')
    searchTextChanged() {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(() => {
            this.submitHandler()
        }, 300)
    }

    render(): VNode {
        return <form action="#" class="form form__inline p4 text--center" method="POST" onSubmit={this.submitHandler}>
            <Input>
                <input type="search" name="search_permission" id="spf_search" v-model={this.searchText} placeholder="Search text here..." />
            </Input>
            <div class="form__action">
                <button type="submit" class="btn btn__primary"><span class="material-icons">search</span></button>
            </div>
        </form>
    }

    submitHandler(event?: Event) {
        if (event)
            event.preventDefault()

        this.$emit('search', this.searchText)
    }
}