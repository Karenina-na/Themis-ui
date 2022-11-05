<template>
    <div class="ThemeButton-box-themeButton">
        <el-switch v-model="theme" inline-prompt active-value="dark" inactive-value="light" :active-icon="MoonIcon"
            active-color="#635c5c" :inactive-icon="SunnyIcon" inactive-color="#dcdfe6" @click="changeTheme" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SunnyIcon from '@/components/icon/SunnyIcon.vue'
import MoonIcon from '@/components/icon/MoonIcon.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    storageKey: 'Theme',
    valueDark: 'dark',
    valueLight: 'light',
})
const toggleDark = useToggle(isDark)
let theme = ref("light")

onMounted(() => {
    theme.value = isDark.value ? "dark" : "light"
})

let changeTheme = () => {
    if (theme.value == "light") {
        toggleDark(false);
    } else {
        toggleDark(true);
    }
}
</script>

<style scoped>
.ThemeButton-box-themeButton {
    align-items: center;
    justify-content: center;
}
</style>