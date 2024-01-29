//  根据浏览器 fetch 封装的 http 请求方式，用法与 api/axios.js 相同。区别在于实现方式不同。
import { isZlbEnv, is_Wechat } from '@/utils/index'
import { zlbConfig } from '@/config'
const prompt = console.log

function mgopRequest(options) {
  // 浙里办的 RPC 调用，使用 mgop 库
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
        timeout: 30000,
        onSuccess: (res) => {
          console.log('调用RPC信息', options.url, res)
          if (res.data.status !== 200) {
            prompt(Object.values(res.data.msgs)[0])
          }
          resolve(res.data)
        },
        onFail: (err) => {
          console.log('error', err)
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
}
function HttpRequest(
  options,
  extra = {
    type: 'json',
  }
) {
  // options 预处理
  if (options.params) {
    // 转换 query 透传
    options.url = options.url + '?' + new URLSearchParams(options.params)
  } else if (options.data) {
    // 转换 data 透传
    options.body = JSON.stringify(options.data)
  }
  // 构造 request 对象
  const request = new Request(options.url, {
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'req-source': is_Wechat() ? 'zlbw' : isZlbEnv() ? 'ZLB' : 'H5',
    },
    ...options,
  })
  // 构造 fetch promise 实例
  const instance = new Promise((resolve, reject) => {
    fetch(request)
      .then((response) => {
        if (response.ok) {
          resolve(response[extra.type]())
        } else {
          prompt('系统错误')
        }
      })
      .catch((error) => {
        // fetch 只有在遇到网络错误的时候才会 reject 这个 promise，比如用户断网或请求地址的域名无法解析等
        prompt(error)
        reject()
      })
  })
  // 构造 http 队列
  return instance
}

const request = isZlbEnv() ? mgopRequest : HttpRequest
export default request
