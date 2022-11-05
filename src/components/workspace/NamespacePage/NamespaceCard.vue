<template>
    <div class="card">
        <span class="card-content">{{ props.namespace }}</span>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['namespace'])

</script>

<style scoped>
/**卡片 */

/**字体 */
.card-content {
    font-size: 45px;
    font-weight: 600;
    transition: all 0.5s;
}

.dark .card-content {
    color: #fff;
    transition: all 0.5s;
}

.light .card-content {
    color: #000;
    transition: all 0.5s;
}
</style>