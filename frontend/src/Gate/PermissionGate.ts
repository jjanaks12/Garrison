import router from "@/router"
import ability from "@/services/ability"
import { NavigationGuardNext, Route } from "vue-router"

export default function (to: Route, from: Route, next: NavigationGuardNext) {
    const access = to.meta?.access

    if (access)
        if (!ability.can(access, 'all'))
            router.push({ name: 'unauthorized' })

    next()
}