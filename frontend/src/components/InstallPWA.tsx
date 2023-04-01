import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'
import { BeforeInstallPromptEvent } from 'vue-pwa-install'

@Component
export default class InstallPWA extends Vue {
    private shown = false
    private installEvent!: BeforeInstallPromptEvent

    created() {
        this.$on("canInstall", (event: BeforeInstallPromptEvent) => {
            event.preventDefault()

            this.installEvent = event
            this.shown = true
        })
    }

    render(): VNode | null {
        return this.shown
            ? <div class="prompt">
                <h3 class="prompt__title h4">Add app to home screen?</h3>
                <p>We are proud to let you know that, you can now add our app to home screen and use as Application.</p>
                <div class="prompt__action">
                    <a href="#" class="btn btn__primary" onClick={this.installPWA}>Install!</a>
                    <a href="#" class="btn btn__info" onClick={this.dismissPrompt}>No, thanks</a>
                </div>
            </div>
            : null
    }

    installPWA(event: Event) {
        event.preventDefault()

        if (this.installEvent) {
            this.installEvent.prompt()
            this.installEvent.userChoice
                .then(() => {
                    this.dismissPrompt(event)
                })
        }
    }

    dismissPrompt(event: Event) {
        event.preventDefault()
        this.shown = false
    }
}