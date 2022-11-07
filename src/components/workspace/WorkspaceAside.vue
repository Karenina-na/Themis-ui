<template>
    <el-scrollbar :height="length">
        <div class="workspace-aside-background">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" class="workspace-expand-and-collapse">
                <el-radio-button :label="false" size="large" class="workspace-expand-and-collapse-button">
                    <span>expand</span>
                </el-radio-button>
                <el-radio-button :label="true" size="large" class="workspace-expand-and-collapse-button">
                    <span>collapse</span>
                </el-radio-button>
            </el-radio-group>
            <el-menu default-active="-1" class="workspace-el-menu-vertical" :collapse="isCollapse">

                <!--system status-->
                <el-sub-menu index="1" @click="getSystemStatus()">
                    <template #title>
                        <el-icon :size="20">
                            <House />
                        </el-icon><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">system status</span>
                    </template>
                    <el-menu-item :index="'1-' + String(system)" v-for="(system, sindex) of systemStatus" :key="sindex"
                        @click="choice_system(system)">
                        <el-icon class="workspace-second-icon">
                            <DArrowRight :size="16" />
                        </el-icon>
                        <span class="workspace-third-system">{{ system }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!--namespace-->
                <el-menu-item index="2" @click="getNamespaces()">
                    <el-icon :size="20">
                        <LocationFilled />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">namespace</span></template>
                </el-menu-item>

                <!--servers status-->
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon :size="20">
                            <Monitor />
                        </el-icon>
                        <span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">servers status</span>
                    </template>

                    <!--colony status-->
                    <el-sub-menu :index="String(colonyName)"
                        v-for="(List, colonyName) of store.GetColoniesAndInstancesNameList()" :key="colonyName">
                        <template #title>
                            <el-icon class="workspace-secondlevel-icon">
                                <ArrowDown :size="16" />
                            </el-icon>
                            <span class="workspace-secondlevel-title">
                                <span class="workspace-second-colonyname">{{ colonyName }}</span>
                            </span>
                        </template>

                        <!--server status-->
                        <el-menu-item :index="String(colonyName) + '-' + String(serverName)"
                            v-for="(serverName, sindex) of List" :key="sindex"
                            @click="choice_server(colonyName, serverName)">
                            <el-icon class="workspace-third-icon">
                                <ArrowRight :size="14" />
                            </el-icon>
                            <span class="workspace-third-servername">{{ serverName }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="4" @click="getOperater()">
                    <el-icon :size="20">
                        <icon-menu />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">operater</span></template>
                </el-menu-item>
                <el-menu-item index="5" @click="getDocument()">
                    <el-icon :size="20">
                        <Document />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">document</span></template>
                </el-menu-item>
            </el-menu>
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    Document,
    Menu as IconMenu,
    House,
    Monitor,
    LocationFilled, ArrowDown, ArrowRight, DArrowRight
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { SetupServersStore } from '../../stores/SetupServersStore'

let store = SetupServersStore()

const router = useRouter()
let length = document.documentElement.clientHeight - 110
const isCollapse = ref(true)
//获取系统状态
function getSystemStatus() {
    router.push('/workspace/system')
}

//获取命名空间
function getNamespaces() {
    router.push({
        path: '/workspace/namespace',
    })
}

//操作页面
function getOperater() {
    router.push({
        path: '/workspace/operater',
    })
}

//文档页面
function getDocument() {
    router.push({
        path: '/workspace/document',
    })
}

//选择当前命名空间下的服务器
function choice_server(colony: number, name: number) {
    console.log(colony, name)
}

const systemStatus = ['HostStatus', 'CpuStatus', 'MemStatus', 'DiskStatus', 'NetworkStatus']

//选择系统状态数据
function choice_system(systemStatus: string) {
    console.log(systemStatus)
}

//加载初始数据
onMounted(() => {
})

</script>
<style scoped>
/**背景 */
.workspace-aside-background {
    width: 100%;
    height: 100%;
}

/** 下拉栏顶部按钮*/
.workspace-expand-and-collapse {
    width: 100%;
    display: flex;
    justify-content: center;
}

.workspace-expand-and-collapse-button span {
    font-size: 14px;
    font-weight: 800;
}

/**垂直下拉栏 */
.workspace-el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
}

/**下拉栏字体样式 */
.workspace-firstlevel-title {
    font-size: 15px;
    margin-left: 5px;
    font-weight: 500;
}

/**下拉栏收缩字体样式 */
.workspace-firstlevel-title-close {
    font-size: 15px;
    font-weight: 400;
}

.workspace-secondlevel-icon {
    margin-left: 10px;
}

.workspace-second-colonyname {
    font-size: 13px;
    font-weight: 500;
    margin-left: 5px;
}

.workspace-third-icon {
    margin-left: 10px;
}

.workspace-third-servername,
.workspace-third-system {
    font-size: 13px;
    margin-left: 10px;
}
</style>