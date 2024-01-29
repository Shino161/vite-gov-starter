// 浙里办统一单点登录
export const sdkLogin = () => {
  return new Promise((resolve, reject) => {
    ZWJSBridge.onReady(async () => {
      const ZWJSBridge = window.ZWJSBridge
      if (ZWJSBridge.ssoTicket) {
        const ssoFlag = await ZWJSBridge.ssoTicket({})
        if (ssoFlag && ssoFlag.result === true) {
          // 使用IRS 浙里办单点登录组件登录
          if (ssoFlag.ticketId) {
            resolve(ssoFlag.ticketId)
          }
        } else {
          reject()
        }
      } else {
        reject()
      }
    })
  })
}
