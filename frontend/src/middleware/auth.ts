import { Route, NavigationGuardNext } from 'vue-router'
import Store from '@/store'
import { Driver } from '@/interfaces/app';

export default (to: Route, from: Route, next: NavigationGuardNext) => {
    const token = Store.getters['root/getToken']

    if (token && token !== 'null' && token !== 'undefined' && to.meta?.type === Driver.AUTHORIZED) {
        next()
    } else {
        next({ name: 'login' })
    }
}