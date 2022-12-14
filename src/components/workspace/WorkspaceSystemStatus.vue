<template>
  <div class="workspaceSystemStatus_box">
    <el-scrollbar :height="length">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>

const length = document.documentElement.clientHeight - 110

</script>

<style scoped>
.workspaceSystemStatus_box {
  width: 100%;
  height: 100%;
}
</style>