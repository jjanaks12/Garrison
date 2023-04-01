import { Permission } from "@/store/modules/Permission"

export default class Role {
    private static INSTANCE = 0

    public id = ''
    public title = ''
    private priority = 0
    public created_at = ''
    public updated_at = ''
    public deleted_at = ''
    public permissions: Array<Permission> = []

    constructor() {
        Role.INSTANCE++
    }

    checkPriority(role: Role): boolean {
        return role.priority > this.priority
    }
}