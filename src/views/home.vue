<template>
  <div class="home">
    home123132311131
    {{dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')}}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import dayjs from 'dayjs'
onMounted(() => {
  console.log("121212312")
})
</script>
<style scoped lang="scss">
.home{
  background-color: blue;
}
</style>