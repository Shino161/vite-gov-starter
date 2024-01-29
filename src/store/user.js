import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    userInfo: (state) => state.userInfo,
  },
})
