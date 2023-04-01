import { Driver } from "@/interfaces/app"
import store from "@/store"
import { NavigationGuardNext, Route } from "vue-router"

export default async function (to: Route, from: Route, next: NavigationGuardNext) {
    const token = store.getters['root/getToken']

    if (token && token !== 'null' && token !== 'undefined' && to.meta?.type === Driver.AUTHORIZED)
        await store.dispatch('root/getAbilities')

    next()
}