<script lang="ts">
import { Modal, ModalProp } from '@/store/modules/Root'
import {Component, Vue} from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

@Component({
    computed: {
        ...mapGetters({
            modal: 'root/getModal'
        })
    },
    methods: {
        ...mapActions({
            toggleModal: 'root/toggleModal'
        })
    }
})
export default class PopModal extends Vue {
    modal!: Modal
    toggleModal!: (payload: ModalProp | null) => void
    clickOnOutside() {
        this.$el.childNodes.forEach((child: Node) => {
            child.addEventListener('click', (event: Event) => {
                event.stopPropagation()
            })
        })

        // this.toggleModal(null)
    }
}
</script>

<template>
    <section :class="{ 'modal': true, 'modal--active': modal.status }" @click={clickOnOutside}>
        <div class="modal__wrap">
            <header class="modal__header">
                <h1 class="modal__title" v-html="modal.title"/>
                <a href="#" class="btn__link" @click.prevent="toggleModal(null)">close</a>
            </header>
            <div class="modal__body">
                <component :is="modal.component" v-bind="modal.props"/>
            </div>
        </div>
    </section>
</template>