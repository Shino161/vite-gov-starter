import * as dd from 'dingtalk-jsapi'

const handleGetAuthCode = ({ corpId, prompt = console.log }) => {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      prompt(corpId)
      dd.runtime.permission.requestAuthCode({
        corpId,
        onSuccess: function (result) {
          prompt('获得免登 authcode')
          if (result) {
            resolve(result.code)
          } else {
            reject(result)
          }
        },
        onFail: function (err) {
          // 调用失败时回调
          prompt('获取 auth_code 失败')
          reject(err)
        },
      })
    })

    dd.error((err) => {
      prompt(`dd error: ${JSON.stringify(err)}`)
    })
  })
}

const login = ({ corpId, getUserInfo, prompt = console.log }) => {
  return new Promise((resolve, reject) => {
    dd.ready(async () => {
      prompt('进入免登', corpId)
      const authCode = await handleGetAuthCode({
        corpId,
        prompt,
      }).catch((err) => {
        reject(err)
      })
      prompt('获取authcode', authCode)
      getUserInfo({
        code: authCode,
        corpId,
      })
        .then((res) => {
          console.log(res)

          if (res && res.success) {
            resolve(res)
          } else {
            prompt('获取用户信息失败')
            reject(res)
          }
        })
        .catch((err) => {
          prompt('获取用户信息失败')
          reject(err)
        })
    })

    dd.error((err) => {
      prompt(`dd error: ${JSON.stringify(err)}`)
    })
  })
}

export default login
