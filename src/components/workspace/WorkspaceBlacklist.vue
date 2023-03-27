<template>
  <div class="workspaceBlackList_box">
    <el-scrollbar :height="length">
      <div class="single_freshData">
        <FreshDataButton :colony="colony" :name="name" :namespace="namespace" @SetBlacklist="SetInstance"/>
      </div>
      <div v-for="(server,index) of Servers" :key="index" class="serverBox">
        <ServerBox :server="server" class="serverBox"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import FreshDataButton from "@/components/workspace/BlackServerPage/FreshDataButton.vue";
import {onMounted, ref} from "vue";
import {GetBlacklistInstances} from "@/network/Manager";
import {useLoading} from "@/util/Loading";
import {ElMessage} from "element-plus";
import ServerBox from "@/components/workspace/BlackServerPage/BlackListServerBox.vue";

let length = document.documentElement.clientHeight - 110
let namespace = ref()
let colony = ref()
let name = ref()
let Servers = ref()

//初始化
onMounted(() => {
  GetBlackList()
});

//获取黑名单信息
function GetBlackList() {
  useLoading()
  GetBlacklistInstances().then(res => {
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
  })
  useLoading().endLoading()
}

//子组件设置信息
function SetInstance(data: any) {
  Servers.value = data
}

</script>

<style scoped>
/*总布局*/
.workspaceBlackList_box {
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