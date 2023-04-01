import { Action, Module, VuexModule } from "vuex-module-decorators"
import { AxiosResponse } from "axios"

import axios from '@/services/axios'
import { User } from "./User"

export interface UserCompliance {
    name: string
    name_added: boolean
    email_verified: boolean
    phone_verified: boolean
}

export enum Timely {
    // WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

export interface ReportParam {
    filter: Timely
    start_date: string,
    end_date: string
}

@Module
export default class Report extends VuexModule {
    @Action
    async userCompliance(): Promise<Array<UserCompliance>> {
        const userList: Array<User> = await this.context.rootGetters['user/list']

        return new Promise((resolve) => {
            const complianceList: Array<UserCompliance> = []

            userList.forEach((user: User) => {
                complianceList.push({
                    name: user.name || user.email,
                    name_added: user.name !== null,
                    email_verified: user.email_verified_at !== null,
                    phone_verified: user.phone_verified_at !== null
                })
            })

            resolve(complianceList)
        })
    }


    @Action
    userReport(payload: ReportParam): Promise<boolean> {
        return new Promise((resolve) => {
            axios.get('user/report', {
                params: payload
            })
                .then(({ data }: AxiosResponse) => {
                    resolve(data)
                })
        })
    }
}