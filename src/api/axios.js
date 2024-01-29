import axios from 'axios'
import { zlbConfig } from '@/config'
import { mgop } from '@aligov/jssdk-mgop'
import { clearDeep, isZlbEnv } from '@/utils/index'
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.httpQueue = []
    this.baseHeaders = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    this.reqMap = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers:
        import.meta.env.VITE_ZLB_ENV === 'prod'
          ? {
              ...this.baseHeaders,
            }
          : {
              isTestUrl: '1',
              ...this.baseHeaders,
            },
    }
    return config
  }
  interceptors(instance, options) {
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      (res) => {
        const { data, status, msgs } = res
        this.httpQueue.pop()
        // 判断 http 状态码是否是 200
        if (status == 200) {
          if (data.status !== 200) {
          }
          // 返回接口数据
          return data
        } else if (data) {
          return Promise.reject(data)
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    options = Object.assign(this.getInsideConfig(), options)
    try {
      clearDeep(options.data || options.params)
    } catch (error) {
      console.log(error)
    }
    // 是否是浙里办环境
    if (isZlbEnv()) {
      return new Promise((resolve, reject) => {
        try {
          const data = {
            api: options.url.replaceAll('/', ''),
            host: zlbConfig.host,
            dataType: 'JSON',
            data: options.data || options.params,
            type: options.method.toUpperCase(),
            appKey: zlbConfig.appKey,
            header: options.headers,
            timeout: 20000,
            onSuccess: (res) => {
              console.log('调用RPC信息', options.url, res)
              if (res.data.status !== 200) {
              }
              resolve(res.data)
            },
            onFail: (err) => {
              reject(err)
            },
          }
          localStorage.setItem('jssdk_log_level', 'debug')
          mgop(data)
        } catch (e) {
          reject(e)
          console.log('request exception', e)
        }
      })
    } else {
      const instance = axios.create({
        headers: { 'Cache-Control': 'no-cache' },
      })
      this.httpQueue.push(instance)
      this.interceptors(instance, options)
      return instance(options)
    }
  }
}
const baseUrl = ''
const http = new HttpRequest(baseUrl)

export default http
