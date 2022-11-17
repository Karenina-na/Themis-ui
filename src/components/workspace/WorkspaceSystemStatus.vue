<template>
  <el-scrollbar :height="length">
    <router-view></router-view>
  </el-scrollbar>
</template>

<script lang="ts" setup>

const length = document.documentElement.clientHeight - 110

</script>

<style scoped>

</style>