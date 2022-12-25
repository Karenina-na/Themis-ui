<template>
  <div class="Namespace-box">
    <label class="Namespace-box-card">
      <div class="Namespace-box-angle">
        <span>{{ props.namespace }}</span>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['namespace'])
</script>

<style scoped>
@import "@/assets/css/slide-in-blurred-top.css";
/**盒子 */
.Namespace-box {
  position: relative;
  transition: all 0.5s;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  padding: 2px;
}

/**主题切换 */
.dark .Namespace-box {
  transition: all 0.5s;
  background-color: #dee2e6;
}

.light .Namespace-box {
  transition: all 0.5s;
  background-color: #343a40;
}

.Namespace-box-angle {
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  height: 290px;
  width: 275px;
  text-align: center;
  line-height: 290px;
}

/**主题切换 */
.light .Namespace-box-angle {
  background-color: #e4e4e4;
  transition: all 0.5s;
  font-size: 50px;
  font-weight: 700;
  color: #343a40;
}

.light .Namespace-box-card:hover .Namespace-box-angle {
  cursor: pointer;
  background-color: #595959;
  font-size: 60px;
  font-weight: 900;
  color: #E5EAF3;
  transition: all 0.5s;
}

.dark .Namespace-box-angle {
  background-color: #242424;
  transition: all 0.5s;
  font-size: 50px;
  font-weight: 700;
  color: #adb5bd;
}

.dark .Namespace-box-card:hover .Namespace-box-angle {
  cursor: pointer;
  background-color: #dee2e6;
  font-size: 60px;
  font-weight: 900;
  color: #343a40;
  transition: all 0.5s;
}
</style>