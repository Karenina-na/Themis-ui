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
                <el-menu-item index="1" @click="getSystemStatus()">
                    <el-icon :size="24">
                        <House />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">system status</span></template>
                </el-menu-item>
                <el-menu-item index="2" @click="getNamespaces()">
                    <el-icon :size="24">
                        <LocationFilled />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">namespace</span></template>
                </el-menu-item>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon :size="24">
                            <Monitor />
                        </el-icon>
                        <span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">servers status</span>
                    </template>
                    <el-sub-menu :index="'3' + '-' + cindex.toString()" v-for="(colony, cindex) of Colonys"
                        :key="'3' + '-' + cindex.toString()">
                        <template #title>
                            <span class="workspace-secondlevel-title">
                                <span class="workspace-second-colonyname">{{ colony.name }}</span>
                            </span>
                        </template>
                        <el-menu-item :index="'3' + '-' + cindex.toString() + '-' + sindex.toString()"
                            v-for="(server, sindex) of colony.servers"
                            :key="'3' + '-' + cindex.toString() + '-' + sindex.toString()"
                            @click="choice_server(cindex, sindex)">
                            <span class="workspace-third-servername">{{ server }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="4" @click="getOperater()">
                    <el-icon :size="24">
                        <icon-menu />
                    </el-icon>
                    <template #title><span class="workspace-firstlevel-title"
                            :class="{ 'workspace-firstlevel-title-close': isCollapse }">operater</span></template>
                </el-menu-item>
                <el-menu-item index="5" @click="getDocument()">
                    <el-icon :size="24">
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
    LocationFilled,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useServersStore } from '@/stores/ServersStore'

const router = useRouter()
let ServersStore = useServersStore()
let length = window.screen.height - 50
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

//查找当前命名空间下的服务器
function choice_server(colony: number, name: number) {
    console.log(colony, name)
}

let Colonys: Array<{
    name: String,
    servers: Array<String>
}>

//加载初始数据
onMounted(() => {
    const data = ServersStore.getColonyAndServerNameList()
    Colonys = new Array<{
        name: String,
        servers: Array<String>
    }>
    data.forEach((value, keys) => {
        Colonys.push({
            name: keys,
            servers: value
        })
    })
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
    font-size: 19px;
    font-weight: 800;
}

/**垂直下拉栏 */
.workspace-el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
}

/**下拉栏字体样式 */
.workspace-firstlevel-title {
    font-size: 18px;
    margin-left: 5px;
    font-weight: 500;
}

/**下拉栏收缩字体样式 */
.workspace-firstlevel-title-close {
    font-size: 15px;
    font-weight: 400;
}

.workspace-second-colonyname {
    font-size: 16px;
    font-weight: 500;
    margin-left: 40px;
}

.workspace-third-servername {
    font-size: 16;
    margin-left: 40px;
}
</style>