<template>
  <div class="chat_wrapper">
    <div class="chat_body" id="chat">
      <div v-for="i in msgs" class="chat_body_item">
        <span class="chat_body_item_time">{{ i.time }}:</span>
        <span>{{ i.text }}</span>
      </div>
    </div>
    <div class="chat_input">
      <input v-model="textBuff" id="input" @keyup.enter="onSendMsg" />
      <button @mousedown.prevent="onSendMsg" :disabled="textBuff === ''">
        send
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
const textBuff = ref();
const msgs = ref([]);
const scrollToBottom = () => {
  let start, previousTimeStamp;
  let done = false;
  const duration = 2000;
  const e = document.getElementById('chat');
  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (previousTimeStamp !== timestamp) {
      e.scrollTo(0, e.scrollTop + e.scrollHeight);
      if (e.scrollTop === e.scrollHeight) done = true;
    }
    if (elapsed < duration) {
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      }
    }
  }
  window.requestAnimationFrame(step);
};

const onSendMsg = () => {
  if (textBuff.value) {
    msgs.value.push({
      time: new Date().toLocaleTimeString(),
      text: textBuff.value,
    });
    textBuff.value = '';
    document.getElementById('input').focus();
    scrollToBottom();
  }
};
onMounted(() => {});
</script>

<style scoped>
.chat_wrapper {
  display: inline-block;
}
.chat_body {
  height: 100px;
  border: solid #ddd 1px;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.chat_body_item {
  display: flex;
}
.chat_body_item_time {
  font-weight: bold;
  margin-right: 5px;
  width: 80px;
}
.chat_input {
  border: solid #ddd 1px;
  padding: 10px;
  input {
    margin-right: 5px;
  }
}
</style>
