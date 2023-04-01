import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"

@Component
export default class SettingPage extends Vue {
    render(): VNode {
        return <section class="card">
            <header class="card__header">
                <h1>SettingPage</h1>
            </header>
            <div class="card__body">
                <div class="card__detail">
                    <strong class="h6">Change Detail <router-link class="btn__link" to={{ name: 'setting.change_detail' }}>view</router-link></strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus error debitis ipsum distinctio vel eos? Voluptatibus maxime, fugit quis veritatis, dicta veniam ex iure asperiores beatae architecto ducimus accusantium quam?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus error debitis ipsum distinctio vel eos? Voluptatibus maxime, fugit quis veritatis, dicta veniam ex iure asperiores beatae architecto ducimus accusantium quam?</p>
                    <strong class="h6">Change Password <router-link class="btn__link" to={{ name: 'setting.change_password' }}>view</router-link></strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus error debitis ipsum distinctio vel eos? Voluptatibus maxime, fugit quis veritatis, dicta veniam ex iure asperiores beatae architecto ducimus accusantium quam?</p>
                </div>
            </div>
        </section>
    }
}