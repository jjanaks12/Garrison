import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Store from '@/store'
import router from '@/router'

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost/api/',
}

const instance = axios.create(config)

// Request interceptor
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = Store.getters['root/getToken']

    if (token && token !== 'null') {
        // config.headers.common['Authorization'] = `Bearer ${token}`
        config.headers = {
            ['Authorization']: `Bearer ${token}`
        }
    }

    return config
})

// Response.interceptor
instance.interceptors.response.use((response: AxiosResponse): AxiosResponse => response, (error: AxiosError): Promise<AxiosError> => {

    if ([401].includes(error.response?.status || 0)) {
        Store.dispatch('root/resetUser')
        router.push({ name: 'login' })
    }

    return new Promise((resolve, reject) => {
        reject(error.response?.data)
    })
})

export default instance