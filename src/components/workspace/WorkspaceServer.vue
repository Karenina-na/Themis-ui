<template>
  <div class="workspaceServer_box">
    <el-scrollbar :height="length">
      <div class="single_freshData">
        <FreshDataButton :colony="colony" :name="name" :namespace="namespace" @SetServer="SetInstance"/>
      </div>
      <div v-for="(server,index) of Servers" :key="index" class="serverBox">
        <ServerBox :server="server" class="serverBox"/>
      </div>
    </el-scrollbar>
  </div>

</template>

<script lang="ts" setup>
import FreshDataButton from "@/components/workspace/ServerPage/FreshDataButton.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {GetInstancesByNamespaceColoniesInstances} from "@/network/Manager";
import {useLoading} from "@/util/Loading";
import {ElMessage} from "element-plus";
import ServerBox from "@/components/workspace/ServerPage/InstanceServerBox.vue";

let length = document.documentElement.clientHeight - 110
let namespace = ref()
let colony = ref()
let name = ref()
let Servers = ref()
const route = useRoute()

//初始化
onMounted(() => {
  GetRoute()
  GetInstance(namespace.value, colony.value, name.value)
});


//路由参数获取信息
function GetRoute() {
  namespace.value = route.query.namespace
  colony.value = route.query.colony
  name.value = route.query.name
}

//获取服务信息
function GetInstance(namespace: string, colony: string, name: string) {
  useLoading()
  GetInstancesByNamespaceColoniesInstances(namespace, colony, name).then(res => {
    ElMessage({
      message: 'loading data success',
      type: 'success',
      duration: 1000,
    })
    Servers.value = res.data
  }, (err) => {
    ElMessage({
      message: 'loading data error: ' + err,
      type: 'error',
      duration: 1000,
    })
  }).finally(() => {
    useLoading().endLoading()
  })
}

//子组件设置信息
function SetInstance(data: any) {
  Servers.value = data
}

</script>

<style scoped>
/*总布局*/
.workspaceServer_box {
  height: 100%;
  margin-left: 20px;
  width: 100%;
}

/*刷新按钮布局*/
.single_freshData {
  padding-right: 50px;
  position: fixed;
  right: 0;
  z-index: 100;
}

/*信息布局*/
.serverBox {
  display: inline-block;
}
</style>