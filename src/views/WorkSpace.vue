<template>
    <div class="workspace-background">
        <el-header class="workspace-head">
            <WorkspaceHeadVue></WorkspaceHeadVue>
        </el-header>
        <el-divider height="1px" />
        <el-container class="workspace-container">
            <el-aside width="250px">
                <WorkspaceAsideVue></WorkspaceAsideVue>
            </el-aside>
            <router-view></router-view>
            <el-main>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import WorkspaceAsideVue from '@/components/workspace/WorkspaceAside.vue';
import WorkspaceHeadVue from '@/components/workspace/WorkspaceHead.vue';
import { useServersStore } from '@/stores/ServersStore';
import { GetAllServers } from '@/network/Manager'
import { ElLoading, ElMessage } from 'element-plus'

const serversStore = useServersStore();

onMounted(() => {
    //加载动画
    const loadingInstance = ElLoading.service({
        fullscreen: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    GetAllServers().then((res) => {
        ElMessage({
            message: 'loading success',
            type: 'success',
            duration: 1000,
        })
        console.log(res.data)
    }, (err) => {
        ElMessage({
            message: 'loading error: ' + err,
            type: 'error',
            duration: 1000,
        })
    }).finally(() => {
        loadingInstance.close()
    })
});

</script>

<style  scoped>
/**背景*/
.workspace-background {
    width: 100%;
    height: 100%;
    flex: bottom;
    user-select: none;
}

/**顶部*/
.workspace-head {
    height: 80px;
    width: 100%;
}

/**下部分容器 */
/* .workspace-container {} */
</style>