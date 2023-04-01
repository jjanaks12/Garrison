import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from 'axios'

import axios from "@/services/axios"
import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { Permission } from "./Permission"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

export interface Role {
    id?: string
    title: string
    priority?: number
    created_at?: string
    updated_at?: string
    deleted_at?: string
    permissions?: Array<Permission>
}

export interface AssignPermissionPayload {
    roleId: string,
    permissions: Array<string>
}

@Module
export default class RoleModule extends VuexModule {
    private roles: iResponse<Role> = responseInit
    private loadingStatus = false

    get list(): Array<Role> {
        return this.roles.data
    }

    get totalCount(): number {
        return this.roles.total
    }

    get lastPage(): number {
        return this.roles.last_page
    }

    get currentPage(): number {
        return this.roles.current_page
    }

    get isLoading(): boolean {
        return this.loadingStatus
    }

    @Mutation
    TOGGLE_LOADING() {
        this.loadingStatus = !this.loadingStatus
    }

    @Mutation
    SET_ROLES(payload: iResponse<Role>) {
        this.roles = payload
    }

    @Action({ commit: 'SET_ROLES' })
    async fetch(data?: RequestQuery) {
        this.context.commit('TOGGLE_LOADING')

        params = Object.assign(params, data)
        const response: AxiosResponse<iResponse<Role>> = await axios.get('roles', params)
        
        setTimeout(() => {
            this.context.commit('TOGGLE_LOADING')
        }, 1000)
        return response.data
    }

    @Action
    nextPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage < this.lastPage) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage + 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    prevPage(): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage > 1) {
                params = {
                    params: {
                        ...params.params,
                        page: this.currentPage - 1
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    gotoPage(pageno: number): Promise<boolean> {
        return new Promise((resolve) => {

            if (this.currentPage >= 1) {
                params = {
                    params: {
                        ...params.params,
                        page: pageno
                    }
                }
                this.context.dispatch('fetch', params)
            }

            resolve(true)
        })
    }

    @Action
    search(searchText: string): Promise<boolean> {
        return new Promise((resolve) => {
            params = {
                params: {
                    ...params.params,
                    s: searchText
                }
            }
            this.context.dispatch('fetch', params)

            resolve(true)
        })
    }

    @Action
    save(formData: Role): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `roles/${formData.id}` : 'roles',
                data: formData
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }

    @Action
    destory(id: string): Promise<boolean> {
        return new Promise(resolve => {
            axios.delete(`roles/${id}`)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }

    @Action
    assignPermission(payload: AssignPermissionPayload): Promise<boolean> {
        return new Promise((resolve) => {
            axios.put(`roles/${payload.roleId}/assign_permissions`, {
                permissions: payload.permissions
            })
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }
}