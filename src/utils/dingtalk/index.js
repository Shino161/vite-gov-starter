import { ddJsApiList } from '@/config'
import {
  checkEnv as ddCheckEnv,
  verificateJsApi as ddVerificateJsApi,
  login as ddLogin,
  chooseContact as ddChooseContact,
} from './dd'

export const checkEnv = ddCheckEnv

export const verificateJsApi = (getTicket, corpId) => {
  return ddVerificateJsApi({
    corpId,
    jsApiList: ddJsApiList,
    getTicket,
  })
}

export const login = (getUserInfo, corpId) => {
  return ddLogin({
    corpId,
    getUserInfo,
  })
}

export const chooseContact = () => {
  return ddChooseContact({
    // 测试环境和生产环境 clientId 不一致
    clientId: import.meta.env.VITE_ZLB_ENV === 'dev' ? '' : '',
  })
}
