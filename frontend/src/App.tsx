import { Component, Vue } from "vue-property-decorator"
import { VNode } from "vue"

import { LayoutType } from "@/interfaces/app"
import SimpleLayout from "@/layouts/Simple"
import AdminLayout from '@/layouts/Admin/index'
import DefaultLayout from '@/layouts/Default/index'

@Component
export default class App extends Vue {
  get layout() {
    if (this?.$route?.meta?.layout === LayoutType.ADMIN)
      return AdminLayout
    else if (this?.$route?.meta?.layout === LayoutType.DEFAULT)
      return DefaultLayout
    else
      return SimpleLayout
  }

  render(): VNode {
    const layout = this.layout

    return (<transition name="fade-transition">
      <layout ref="page_layout" />
    </transition>)
  }
}