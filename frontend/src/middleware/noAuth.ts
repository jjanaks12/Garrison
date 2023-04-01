import { Route, NavigationGuardNext } from 'vue-router'
import Store from '@/store'
import { Driver } from '@/interfaces/app'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
  const token = Store.getters['root/getToken']

  if (token && token !== 'null' && to.meta?.type === Driver.UNAUTHORIZED) {
    next({ name: 'dashboard' })
  }

  next()
}