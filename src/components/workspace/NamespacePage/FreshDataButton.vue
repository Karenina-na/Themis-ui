<template>
  <div class="FreshDataButton">
    <button @click="FreshData()">Fresh Data</button>
  </div>
</template>

<script lang="ts" setup>
import {GetAllNamespaces, GetColoniesAndInstancesByNamespace} from "@/network/Manager";
import {ElMessage, ElNotification} from "element-plus";
import {SetupServersStore} from '@/stores/SetupServersStore'

let store = SetupServersStore()
let timer: any = null

//刷新数据
function FreshData() {

  if (timer) {
    clearTimeout(timer)
  }

  //设置定时器防止刷新过快
  timer = setTimeout(() => {
    ElNotification({
      type: 'success',
      title: 'Fresh Data',
      message: 'success',
      duration: 2000,
    })
    GetNamespace()
    GetColonyAndServerNameByNamespace(store.GetNamespace())
  }, 1000)
}

// 获取命名空间
function GetNamespace() {
  GetAllNamespaces().then((res) => {
    store.SetNamespaceNameList(res.data)
  }, (err) => {
    ElMessage({
      message: 'loading data error: ' + err,
      type: 'error',
      duration: 1000,
    })
  })
}

// 获取指定命名空间下的所有集群和服务名称
function GetColonyAndServerNameByNamespace(namespace: string) {
  GetColoniesAndInstancesByNamespace(namespace).then((res) => {
    store.SetColoniesAndInstancesNameList(res.data)
  }, (err) => {
    ElMessage({
      message: 'loading data error: ' + err,
      type: 'error',
      duration: 1000,
    })
  })
}
</script>

<style scoped>
button {
  padding: 0.8em 1.8em;
  border: 2px solid #48cae4;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  transition: .3s;
  z-index: 1;
  font-family: inherit;
  color: #48cae4;
}

button::before {
  content: '';
  width: 0;
  height: 300%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #48cae4;
  transition: .5s ease;
  display: block;
  z-index: -1;
}

button:hover::before {
  width: 105%;
}

button:hover {
  color: #111;
  cursor: pointer;
}

.FreshDataButton {
  scale: 0.8;
}

button:active {
  transform: scale(0.9);
  transition: all 0.2s ease-in-out;
}

</style>