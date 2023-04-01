import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"
import axios from '@/services/axios'

import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { Role } from "./Role"
import { Image } from "./Root"

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

export interface User {
    id?: string
    name: string
    phone: string
    email: string
    address: string
    password?: string
    confirm_password?: string
    token?: string
    email_verified_at?: string
    phone_verified_at?: string
    created_at?: string

    roles?: Array<Role>

    media?: Image
    media_id?: string

    file?: string
}

export interface AssignRolePayload {
    userID: string
    roleID: string
}

@Module
export default class UserModule extends VuexModule {
    private users: iResponse<User> = responseInit
    private loadingStatus = false

    get list(): Array<User> {
        return this.users.data
    }

    get totalCount(): number {
        return this.users.total
    }

    get lastPage(): number {
        return this.users.last_page
    }

    get currentPage(): number {
        return this.users.current_page
    }

    get isLoading(): boolean {
        return this.loadingStatus
    }

    @Mutation
    SET_PERMISSION(payload: iResponse<User>) {
        this.users = payload
    }

    @Mutation
    TOGGLE_LOADING() {
        this.loadingStatus = !this.loadingStatus
    }

    @Action({ commit: 'SET_PERMISSION' })
    async fetch(data?: RequestQuery) {
        this.context.commit('TOGGLE_LOADING')
        params = Object.assign(params, data)

        const response: AxiosResponse<iResponse<User>> = await axios.get('users', params)

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
    save(formData: User): Promise<boolean> {
        return new Promise((resolve) => {

            axios({
                method: formData.id ? 'put' : 'post',
                url: formData.id ? `users/${formData.id}` : 'users',
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
            axios.delete(`users/${id}`)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }

    @Action
    assignRole({ userID, roleID }: AssignRolePayload): Promise<boolean> {
        return new Promise((resolve) => {
            axios.put(`user/${userID}/assign_role/${roleID}`)
                .then(() => {
                    this.context.dispatch('fetch')
                    resolve(true)
                })
        })
    }
}