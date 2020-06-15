import axios from 'axios'
import { installPlugin } from '@/utils/install'
import router from '@/router'

declare module 'vue/types/vue' {
    interface Vue {
        __apis: {
        }
    }
}

export const __apis = {
}

export default {
    install: installPlugin('__apis', __apis)
}

export type BaseRes <T> = Promise< { data: T, errCode: number } >

export interface BaseListReq {
    page: number
    pageSize?: number
}

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    if (config.method !== 'get') {
        config.headers['token'] = localStorage.getItem('token') || ''
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'

        // 过滤无效值
        for (const k in config.data) {
            if ([undefined, null, NaN].includes(config.data[k])) {
                delete config.data[k]
            }
        }

        /* 处理x-www的数据请求格式，目前只有这一种请求方式 */
        if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = Object.keys(config.data).map((name: string) => {
                return `${name}=${encodeURIComponent(config.data[name])}`
            }).join('&')
        }
    }

    return config
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    let { data, config } = response
    if (typeof data === 'string') {
        err(`Error: ${data}`)
        return Promise.reject(data)
    } else if (data.errCode !== 0) {
        err(`Error: ${data.errMsg}`)
        return Promise.reject(err(data.errMsg))
    }
    return data
})

const err = (info:string = '') => {
    return new Error(info)
}
