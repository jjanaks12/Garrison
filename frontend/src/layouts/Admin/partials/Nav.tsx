import { Component, Vue } from "vue-property-decorator"
import { VNode } from 'vue'

import User from "@/components/UserDropdown"
import ability from '@/services/ability';
import navigationList, { NavigationItem } from "./routeList";

@Component
export default class Nav extends Vue {

    render(): VNode {
        return <nav id='nav'>
            <User />
            <router-link class="btn__link" to={{ name: 'home' }}>Back to Page</router-link>
            <ul class="main__navigation">
                {navigationList.map((navigationItem: NavigationItem) => navigationItem.access
                    ? ability.can(navigationItem.access, 'all')
                        ? this.getNavItem(navigationItem)
                        : null
                    : this.getNavItem(navigationItem)
                )}
            </ul>
        </nav>
    }

    getNavItem(item: NavigationItem): VNode {
        const isActive: boolean = item.route === this.$route.name
        const navShow: boolean = item.route === this.$route.name
            || (item.children
                ? item.children.map((submenu: NavigationItem) => submenu.route).includes(this.$route.name as string)
                : false)

        return <li class={{ 'nav--active': isActive, 'nav--show': navShow }}>
            <router-link to={{ name: item.route }}><span class="material-icons">{item.icon}</span>{item.title}</router-link>
            {item.children && item.children.length > 0
                ? <ul class="submenu">
                    {item.children.map((submenu: NavigationItem) => this.getNavItem(submenu))}
                </ul>
                : null
            }
        </li>
    }
}