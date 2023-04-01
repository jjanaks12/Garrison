import auth from '@/middleware/auth'
import noAuth from '@/middleware/noAuth'
import { NavigationGuardNext, Route } from 'vue-router'

export default (to: Route, from: Route, next: NavigationGuardNext) => {
    const type = to?.meta?.type

    switch (type) {
        case 'authorized':
            auth(to, from, next)
            break
        case 'unauthorized':
            noAuth(to, from, next)
            break
        default:
            next()
    }
}