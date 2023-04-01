import { RouteConfig } from 'vue-router'

export enum LayoutType {
    DEFAULT = 'default',
    ADMIN = 'admin',
    NONE = 'none'
}

export enum Driver {
    UNAUTHORIZED = 'unauthorized',
    AUTHORIZED = 'authorized',
    NONE = 'none'
}

export interface RequestParams {
    [propName: string]: string | number | boolean | null | undefined
}

export interface RequestQuery {
    params?: RequestParams,
    query?: {
        [propName: string]: string | number | boolean | null
    }
}

export interface iResponse<T> {
    data: Array<T>
    current_page: number
    per_page: number
    last_page: number
    total: number
}

export type newRouteConfig = RouteConfig & {
    meta: {
        layout: LayoutType
        type: Driver,
        access: string | null
    }
}

export interface iErrorMessage {
    status: number,
    message: string,
    data: Array<string>
}

export const responseInit = {
    data: [],
    current_page: 0,
    per_page: 0,
    last_page: 0,
    total: 0,
}