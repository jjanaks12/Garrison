import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosError, AxiosResponse } from "axios"

import axios from '@/services/axios'
import ability from '@/services/ability'

import Role from "@/interfaces/Role"
import { Component } from "vue/types/umd"
import { User } from '@/store/modules/User';

export interface Register {
    email: string
    password: string
    password_confirmation: string
}

export interface PasswordReset {
    email: string
    password: string
    password_confirmation: string
    token: string
}

export interface Password {
    password: string
    password_confirmation: string
}

export interface Login {
    email: string
    password: string
}

export interface Modal {
    title: string
    status: boolean
    component: Component | null
    props?: {
        [propName: string]: string | number | boolean | object | null | undefined
    } | null
}

export interface ModalProp {
    title: string
    component: Component | null
    props?: {
        [propName: string]: string | number | boolean | object | null | undefined
    } | null
}

export interface Image {
    id?: string
    path: string
    url?: string
    description: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export interface Attendance {
    id?: string
    user_id: string
    checkin: string
    checkout: string
    created_at: string
    updated_at: string
    user?: User
}

let timer: number

@Module
export default class Root extends VuexModule {
    private token: string | null = null
    private userDetail: User | null = null
    private userRole: Role | null = null
    private profileImage: Image | null = null
    private modal: Modal = {
        title: '',
        status: false,
        component: null
    }

    get getLoggedinUser(): User | null {
        return this.userDetail
    }

    get getToken(): string | null {
        return this.token
    }

    get getModal(): Modal {
        return this.modal
    }

    get myRole(): Role | null {
        return this.userRole
    }

    get avatar(): Image | null {
        return this.profileImage
    }

    @Mutation
    SET_TOKEN(token: string): void {
        this.token = token
    }

    @Mutation
    SET_LOGIN_USER(userDetail: User): void {
        this.userDetail = { ...userDetail }
    }

    @Mutation
    UPDATE_MODAL(modal: Modal) {
        this.modal = modal
    }

    @Mutation
    UPDATE_ROLE(payload: Role | null): void {
        this.userRole = payload
    }

    @Mutation
    UPDATE_AVATAR(payload: Image | null): void {
        this.profileImage = payload
    }

    @Action
    async getStats() {
        const { data } = await axios.get('/stats')
        return data
    }

    @Action
    login(formData: Login): Promise<string> {
        return new Promise((resolve) => {

            axios.post('auth/login', formData)
                .then(({ data }: AxiosResponse) => {
                    this.context.commit('SET_TOKEN', data.data.token)

                    this.context.dispatch('fetchLogginedUser')
                    resolve('success')
                })
                .catch(({ message }: AxiosError) => {
                    resolve(message)
                })
        })
    }

    @Action
    register(formData: Login): Promise<string> {
        return new Promise((resolve) => {

            axios.post('auth/register', formData)
                .then(({ data }: AxiosResponse) => {
                    this.context.commit('SET_TOKEN', data.data.token)

                    this.context.dispatch('fetchLogginedUser')
                    resolve('success')
                })
                .catch(({ message }: AxiosError) => {
                    resolve(message)
                })
        })
    }

    @Action
    logout(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.post('auth/logout')
                .then(() => {
                    this.context.commit('SET_TOKEN', null)
                    this.context.commit('SET_LOGIN_USER', {})
                    ability.update([{
                        subject: 'all',
                        action: []
                    }])
                    resolve(true)
                })
        })
    }

    @Action
    fetchLogginedUser(): Promise<boolean> {
        return new Promise((resolve) => {

            axios.get('me')
                .then(({ data }: AxiosResponse) => {
                    this.context.commit('SET_LOGIN_USER', data.user)
                    this.context.commit('UPDATE_ROLE', data.role)
                    this.context.commit('UPDATE_AVATAR', data.avatar)
                    resolve(true)
                })
        })
    }

    @Action
    resetUser(): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_TOKEN', null)
            this.context.commit('SET_LOGIN_USER', {})

            resolve(true)
        })
    }

    @Action
    getAbilities(): Promise<boolean> {
        return new Promise((resolve) => {
            if (timer)
                clearTimeout(timer)

            timer = setTimeout(() => {
                axios.get('abilities')
                    .then(({ data }: AxiosResponse) => {
                        ability.update([{
                            subject: 'all',
                            action: data.data
                        }])
                        resolve(data.data)
                    })
            })
        })
    }

    @Action
    toggleModal(payload: ModalProp | null): void {

        if (payload)
            this.context.commit('UPDATE_MODAL', {
                title: payload.title,
                status: true,
                component: payload.component,
                props: payload.props
            })
        else {
            this.context.commit('UPDATE_MODAL', {
                title: '',
                status: false,
                component: null,
                props: null
            })
        }
    }


    @Action
    changePassword(formData: Password): Promise<boolean> {
        return new Promise((resolve) => {

            axios.put('/auth/change_password', formData)
                .then(() => {
                    resolve(true)
                })
        })
    }

    @Action
    changeDetail(formData: User): Promise<boolean | AxiosError> {
        return new Promise((resolve) => {
            axios.put('/auth/change_detail', formData)
                .then(() => {
                    this.context.dispatch('fetchLogginedUser')
                    resolve(true)
                })
                .catch((data: AxiosError) => {
                    resolve(data)
                })
        })
    }

    @Action
    forgetPassword(email: string): Promise<boolean | AxiosError> {
        return new Promise((resolve) => {
            axios.post('/auth/forgot_password', {
                email,
                host: location.origin
            })
                .then((data) => {
                    console.log(data);
                    resolve(true)
                })
                .catch((data: AxiosError) => {
                    resolve(data)
                })
        })
    }

    @Action
    resetPassword(formData: PasswordReset): Promise<boolean | AxiosError> {
        return new Promise((resolve) => {
            axios.put('auth/reset_password', formData)
                .then((data) => {
                    console.log(data);
                    resolve(true)
                })
                .catch((data: AxiosError) => {
                    resolve(data)
                })
        })
    }

    @Action
    todayAttendance(): Promise<Attendance | AxiosError> {
        return new Promise((resolve) => {
            axios.get('user/today_attendance')
                .then(({ data }: AxiosResponse) => {
                    resolve(data.data as Attendance)
                })
                .catch((data: AxiosError) => {
                    resolve(data)
                })
        })
    }

    @Action
    doAttendance(): Promise<boolean | AxiosError> {
        return new Promise((resolve) => {
            axios.post('user/attendance')
                .then(() => {
                    resolve(true)
                })
                .catch((data: AxiosError) => {
                    resolve(data)
                })
        })
    }
}