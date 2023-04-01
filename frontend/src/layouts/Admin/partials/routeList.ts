export interface NavigationItem {
    title: string
    route: string
    icon: string
    access: string | null
    children?: Array<NavigationItem>
}

const navigationList: Array<NavigationItem> = [{
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'dashboard',
    access: null
}, {
    title: 'Users',
    route: 'user',
    icon: 'contacts',
    access: 'manage_user'
}, {
    title: 'Attendance',
    route: 'attendance',
    icon: 'schedule',
    access: 'see_attendance'
}, {
    title: 'Roles',
    route: 'role',
    icon: 'group',
    access: 'manage_role'
}, {
    title: 'Permissions',
    route: 'permission',
    icon: 'key',
    access: 'manage_permission'
}, {
    title: 'Report',
    route: 'report',
    icon: 'description',
    access: 'manage_report',
    children: [{
        title: 'User Compliance',
        route: 'report.user_compliance',
        icon: 'description',
        access: 'manage_report'
    }, {
        title: 'User',
        route: 'report.new_user',
        icon: 'description',
        access: 'manage_report'
    }]
}, {
    title: 'Settings',
    route: 'setting',
    icon: 'settings',
    access: '',
    children: [{
        title: 'Change Password',
        route: 'setting.change_password',
        icon: 'sync_lock',
        access: ''
    }, {
        title: 'Change Detail',
        route: 'setting.change_detail',
        icon: 'manage_accounts',
        access: ''
    }]
}]

export default navigationList