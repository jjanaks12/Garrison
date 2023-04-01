import { Driver, LayoutType, newRouteConfig } from '@/interfaces/app'

export const routes: Array<newRouteConfig> = [{
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage'),
    meta: {
        layout: LayoutType.DEFAULT,
        type: Driver.NONE,
        access: null
    }
}, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/admin/DashboardPage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: null
    }
}, {
    path: '/roles',
    name: 'role',
    component: () => import('@/pages/admin/RolesPage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_role'
    }
}, {
    path: '/permissions',
    name: 'permission',
    component: () => import('@/pages/admin/PermissionPage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_permission'
    }
}, {
    path: '/users',
    name: 'user',
    component: () => import('@/pages/admin/UserPage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_user'
    }
}, {
    path: '/settings',
    name: 'setting',
    component: () => import('@/pages/account/SettingPage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: null
    }
}, {
    path: '/attendance',
    name: 'attendance',
    component: () => import('@/pages/admin/AttendacePage'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'see_attendance'
    }
}, {
    path: '/settings/change_password',
    name: 'setting.change_password',
    component: () => import('@/pages/account/ChangePassword'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: null
    },
}, {
    path: '/settings/change_detail',
    name: 'setting.change_detail',
    component: () => import('@/pages/account/ChangeDetail'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: null
    },
}, {
    path: '/report',
    name: 'report',
    component: () => import('@/pages/report/Index'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_report'
    },
}, {
    path: '/report/user_compliance',
    name: 'report.user_compliance',
    component: () => import('@/pages/report/UserCompliance'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_report'
    },
}, {
    path: '/report/new_user',
    name: 'report.new_user',
    component: () => import('@/pages/report/User'),
    meta: {
        layout: LayoutType.ADMIN,
        type: Driver.AUTHORIZED,
        access: 'manage_report'
    },
}, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/account/Login'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.UNAUTHORIZED,
        access: null
    }
}, {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/account/Register'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.UNAUTHORIZED,
        access: null
    }
}, {
    path: '/forgot_password',
    name: 'forgot_password',
    component: () => import('@/pages/account/ForgotPassword'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.UNAUTHORIZED,
        access: null
    }
}, {
    path: '/password_reset',
    name: 'password_reset',
    component: () => import('@/pages/account/ResetPassword'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.UNAUTHORIZED,
        access: null
    }
}, {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/pages/error/UnAuthorized'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.NONE,
        access: null
    }
}, {
    path: '*',
    name: '404',
    component: () => import('@/pages/error/NotFound'),
    meta: {
        layout: LayoutType.NONE,
        type: Driver.NONE,
        access: null
    }
}]