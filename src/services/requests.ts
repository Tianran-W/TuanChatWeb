import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

const prefix = 'http://192.168.137.181:8081'

export const computedToken = {
  get() {
    return localStorage.getItem('token') || ''
  }
}

export const userAlovaIns = createAlova({
  baseURL: prefix, // 请求的基础路径
  id: 'user', // 实例标识
  timeout: 10000, // 请求超时时间
  statesHook: VueHook, // 使用VueHook来管理请求状态
  requestAdapter: adapterFetch(), // 全局请求适配器

  // 请求拦截器
  beforeRequest(method) {
    method.config.headers.Authorization = `Bearer ${computedToken.get()}`
    method.config.headers['Content-Type'] = 'application/json; charset=utf-8'
  },

  // 响应拦截器
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        // 抛出错误，进入请求失败拦截器
        throw new Error(response.statusText)
      }
      const json = await response.json()
      if (!json.success) {
        throw new Error(json.errMsg)
      }
      return json.data
    },

    onError: (err) => {
      alert(err.message)
    },

    onComplete: () => {}
  }
})
