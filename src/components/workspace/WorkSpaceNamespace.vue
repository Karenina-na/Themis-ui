<template>
  <el-scrollbar :height="length">
    <div class="single_freshData">
      <FreshDataButton/>
    </div>
    <div class="WorkspaceNamespace-box">
      <NamespaceBox v-for="(namespace, index) of namespaces" :key="index" :namespace="namespace"
                    class="namespaceBox" @click="SelectNamespace(namespace)">
      </NamespaceBox>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import NamespaceBox from './NamespacePage/NamespaceBox.vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {GetAllNamespaces, GetColoniesAndInstancesByNamespace} from '@/network/Manager';
import FreshDataButton from "@/components/workspace/NamespacePage/FreshDataButton.vue";
import {markRaw, onMounted, ref, watchEffect} from 'vue';
import WifiIcon from '../WifiIcon.vue'
import {SetupServersStore} from '@/stores/SetupServersStore'
import {useLoading} from '@/util/Loading'

let store = SetupServersStore()

let length = document.documentElement.clientHeight - 110
const namespaces = ref()

//监控命名空间变化
watchEffect(() => {
  namespaces.value = store.GetNamespaceNameList()
})

//初始化
onMounted(() => {
  GetNamespace()
});

//选取命名空间
function SelectNamespace(namespace: string) {
  ElMessageBox.confirm(
      '<div style="margin-left:40px;font-size:15px;">' + 'Are you sure to select this namespace? '
      + "<div style='font-size:16px;font-weight:400;margin:auto'>namespace : " +
      "<span style='font-weight:700;font-size:20px;'>" + namespace + "</span>" +
      "</div>" + '</div>',
      'Operation',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString: true,
        type: 'warning',
        icon: markRaw(WifiIcon)
      }
  ).then(() => {
    useLoading()
    store.SetNamespace(namespace)
    GetColonyAndServerNameByNamespace(namespace)
    useLoading().endLoading()
  }).catch(() => {
    ElMessage({
      type: 'warning',
      message: 'cancel operation',
    })
  })
}

// 获取指定命名空间下的所有集群和服务名称
function GetColonyAndServerNameByNamespace(namespace: string) {
  GetColoniesAndInstancesByNamespace(namespace).then((res) => {
    store.SetColoniesAndInstancesNameList(res.data)
    ElMessage({
      type: 'success',
      message: 'choice namespace: ' + namespace,
      duration: 1000,
    })
  }, (err) => {
    ElMessage({
      message: 'loading data error: ' + err,
      type: 'error',
      duration: 1000,
    })
  })
}

// 获取命名空间
function GetNamespace() {
  if (store.GetNamespaceNameListLength() > 0) {
    namespaces.value = store.GetNamespaceNameList()
    return
  }
  useLoading()
  GetAllNamespaces().then((res) => {
    ElMessage({
      message: 'loading data success',
      type: 'success',
      duration: 1000,
    })
    namespaces.value = res.data
    store.SetNamespaceNameList(res.data)

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

</script>

<style scoped>

/**盒子 */
.WorkspaceNamespace-box {
  width: 100%;
  height: auto;
}

/*刷新按钮布局*/
.single_freshData {
  padding-right: 50px;
  position: fixed;
  right: 0;
  z-index: 100;
}

/**每个命名空间盒子 */
.namespaceBox {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  float: left;
}

</style>