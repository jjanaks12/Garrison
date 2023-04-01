import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from 'axios'

import axios from "@/services/axios"
import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

export interface Permission {
    id?: string
    title: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

@Module
export default class PermissionModule extends VuexModule {
    private permissions: iResponse<Permission> = responseInit
    private loadingStatus = false

    get permissionList(): Array<Permission> {
        return this.permissions.data
    }

    get totalCount(): number {
        return this.permissions.total
    }

    get lastPage(): number {
        return this.permissions.last_page
    }

    get currentPage(): number {
        return this.permissions.current_page
    }

    get isLoading(): boolean {
        return this.loadingStatus
    }

    @Mutation
    SET_PERMISSION(payload: iResponse<Permission>) {
        this.permissions = payload
    }

    @Mutation
    TOGGLE_LOADING() {
        this.loadingStatus = !this.loadingStatus
    }

    @Action({ commit: 'SET_PERMISSION' })
    async fetch(data?: RequestQuery) {
        this.context.commit('TOGGLE_LOADING')
        params = Object.assign(params, data)

        const response: AxiosResponse<iResponse<Permission>> = await axios.get('permissions', params)
        
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
    save(formData: Permission): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `permissions/${formData.id}` : 'permissions',
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
            axios.delete(`permissions/${id}`)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }
}