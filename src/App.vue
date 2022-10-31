<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeButton from '@/components/ThemeButton.vue'
</script>

<template>
  <div class="app-top">
    <ThemeButton class="app-theme-button"></ThemeButton>
  </div>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

/**主题按钮边框 */
.app-top {
  margin: auto;
  flex: top;
  width: 100px;
  text-align: center;
  transform: scale(1.8);
  height: 0px;
}

/**主题按钮 */
.app-theme-button {
  padding-top: 8px;
  margin: auto;
}
</style>
