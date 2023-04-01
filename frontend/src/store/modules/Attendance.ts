import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from '@/services/axios'
import { iResponse, RequestQuery, responseInit } from "@/interfaces/app"
import { Attendance } from '@/store/modules/Root'

let params: RequestQuery = {
    params: {
        per_page: 10
    }
}

@Module
export default class AttendanceModule extends VuexModule {
    private attendances: iResponse<Attendance> = responseInit
    private loadingStatus = false

    get attendanceList(): Array<Attendance> {
        return this.attendances.data
    }

    get totalCount(): number {
        return this.attendances.total
    }

    get lastPage(): number {
        return this.attendances.last_page
    }

    get currentPage(): number {
        return this.attendances.current_page
    }

    get isLoading(): boolean {
        return this.loadingStatus
    }

    @Mutation
    SET_ATTENDANCE(payload: iResponse<Attendance>) {
        this.attendances = payload
    }

    @Mutation
    TOGGLE_LOADING() {
        this.loadingStatus = !this.loadingStatus
    }

    @Action({ commit: 'SET_ATTENDANCE' })
    async fetch(data?: RequestQuery) {
        this.context.commit('TOGGLE_LOADING')
        params = Object.assign(params, data)

        const response: AxiosResponse<iResponse<Attendance>> = await axios.get('attendances', params)

        setTimeout(() => {
            this.context.commit('TOGGLE_LOADING')
        }, 1000)
        return response.data
    }

}