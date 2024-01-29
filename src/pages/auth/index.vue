<template>
  <div>加载中...</div>
</template>

<script setup>
import { checkEnv, login as dingLogin } from '@/utils/dingtalk'
import { sdkLogin } from '@/utils/zlbenv'
import { getUserInfo } from '@/api/api'
import { getCurrUrlQuerys } from '@/utils'
import { useStore } from '@/store/system'
import { onMounted } from 'vue'
const store = useStore()
const goToLogin = () => {
  checkEnv()
    .then(() => {
      // 钉钉环境
      dingLogin(store.clientId, getUserInfo).then((res) => {
        // 登录
      })
    })
    .catch((err) => {
      sdkLogin()
        .then((ticketId) => {
          // 登录
        })
        .catch((err) => {})
    })
}

onMounted(() => {
  store.clientId = getCurrUrlQuerys().clientId
  goToLogin()
})
</script>

<style scoped></style>
