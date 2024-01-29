import { defineStore } from 'pinia'
export const useStore = defineStore('system', {
  state: () => ({
    // 钉钉登录获取的凭证
    clientId: {},
  }),
  getters: {
    userInfo: (state) => state.clientId,
  },
})
