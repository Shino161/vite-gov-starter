import * as dd from 'dingtalk-jsapi'
import _ from 'lodash'

export const clearDeep = (obj) => {
  if (!obj || !typeof obj === 'object') return
  const keys = Object.keys(obj)
  for (let key of keys) {
    const val = obj[key]
    if (typeof val === 'undefined' || (typeof val === 'object' && !val)) {
      delete obj[key]
    } else if (typeof val === 'object') {
      clearDeep(obj[key])
    }
  }
}

export const onPhoneCall = (phone) => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  const isZLB =
    sUserAgent.indexOf('dtdreamweb') > -1 ||
    sUserAgent.indexOf('miniprogram') > -1
  if (phone) {
    if (isZLB) {
      // 浙里办环境
      ZWJSBridge.phoneCall({
        corpId: phone + '',
      })
    } else {
      // 钉钉环境
      dd.biz.telephone.showCallMenu({
        phoneNumber: phone, // 期望拨打的电话号码
        code: '+86', // 国家代号，中国是+86
        showDingCall: true, // 是否显示钉钉电话
        onSuccess: function () {},
        onFail: function () {},
      })
    }
  }
}

// 获取当前用户端类型
export const getReqSource = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  if (sUserAgent.includes('zlb')) {
    return 'ZLB'
  } else if (
    sUserAgent.includes('miniprogram') &&
    sUserAgent.includes('alipay')
  ) {
    return 'ZFB'
  } else if (
    sUserAgent.includes('miniprogram/wx') ||
    window.__wxjs_environment === 'miniprogram'
  ) {
    return 'ZLBW'
  } else if (sUserAgent.includes('dingtalk')) {
    return 'DING'
  } else {
    return 'H5'
  }
}
// 浙里办环境
export const isZlbEnv = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  return (
    sUserAgent.indexOf('dtdreamweb') > -1 ||
    sUserAgent.indexOf('miniprogram') > -1
  )
}
// 浙里办APP
export const isZlbApp = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  return sUserAgent.includes('zlb')
}
// 判断是否是浙里办支付宝
export const is_ZFB = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  return (
    sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1
  )
}
// 判断是否是微信端
export const is_Wechat = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  return (
    sUserAgent.includes('miniprogram/wx') ||
    window.__wxjs_environment === 'miniprogram'
  )
}

export const is_DingTalk = () => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  return sUserAgent.indexOf('dingtalk') > -1
}

export const getCurrUrlQuerys = () => {
  let result = {}
  const url = window.location.href.split('?')[1].replace(/#.*$/, '')
  const params = new URLSearchParams(url)
  for (const i of params) {
    result[i[0]] = i[1]
  }
  return result
}
