<template>
    <div class="workspace-head-background">
        <span class="workspace-head-title">Themis</span>
        <div class="workspace-icons">
            <User width="40px" class="workspace-icon" />
            <Setting width="40px" class="workspace-icon" />
            <InfoFilled width="40px" class="workspace-icon" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Setting, User, InfoFilled } from '@element-plus/icons-vue'

</script>

<style scoped>
/** 背景 */
.workspace-head-background {
    height: 100%;
    width: 100%;
    display: flex;
}

/**标题 */
.workspace-head-title {
    font-family: Quotes, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 800;
    font-size: 70px;
    cursor: pointer;
    transition: all 0.3s;
}

.workspace-head-title:hover {
    transform: scale(1.1);
    transition: all 0.5s;
    color: #409eff;
}

.workspace-head-title:active {
    transform: scale(1.1);
    transition: all 0.5s;
    color: #409eff;
}

/**图标 */
.workspace-icons {
    margin-top: 12px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.workspace-icon {
    margin-right: 30px;
    transition: all 0.3s;
}

.workspace-icon:hover {
    cursor: pointer;
    transform: scale(1.3);
    transition: all 0.5s;
}

.workspace-icon:active {
    transform: scale(1.1);
    transition: all 0.1s;
}
</style>