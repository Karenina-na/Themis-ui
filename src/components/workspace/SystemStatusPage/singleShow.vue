<template>
  <div>
    <div>
      <FreshDataButton/>
    </div>
    <div v-if="choice===0">
      <HostStatus :value="host_info"/>
    </div>
    <div v-if="choice===1">
      <CpuStatus :value="cpu_info"/>
    </div>
    <div v-if="choice===2">
      <MemStatus :value="mem_info"/>
    </div>
    <div v-if="choice===3">
      <DiskStatus :value="disk_info"/>
    </div>
    <div v-if="choice===4">
      <NetStatus :value="net_info"/>
    </div>
    <div v-if="choice===5">
      <PoolStatus :value="pool_info"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FreshDataButton from '../SystemStatusPage/FreshDataButton.vue'
import HostStatus from './SystemComponents/HostStatus.vue'
import CpuStatus from './SystemComponents/CpuStatus.vue'
import MemStatus from './SystemComponents/MemStatus.vue'
import DiskStatus from './SystemComponents/DiskStatus.vue'
import NetStatus from './SystemComponents/NetStatus.vue'
import PoolStatus from './SystemComponents/PoolStatus.vue'
import {useRoute} from 'vue-router'
import {onMounted, ref, watchEffect} from "vue";
import {SetupServersStore} from "@/stores/SetupServersStore";

const store = SetupServersStore()

let host_info = ref()
let cpu_info = ref()
let mem_info = ref()
let disk_info = ref()
let net_info = ref()
let pool_info = ref()

let choice = ref(0)

//获取路由参数
const props = useRoute()

onMounted(() => {
  const status = store.GetSystemStatus()
  host_info.value = status.get('host_info')
  cpu_info.value = status.get('cpu_info')
  mem_info.value = status.get('mem_info')
  disk_info.value = status.get('disk_info')
  net_info.value = status.get('net_info')
  pool_info.value = status.get('pool_info')
})

watchEffect(() => {
  switch (props.params.choice) {
    case 'HostStatus':
      choice.value = 0
      break
    case 'CpuStatus':
      choice.value = 1
      break
    case 'MemStatus':
      choice.value = 2
      break
    case 'DiskStatus':
      choice.value = 3
      break
    case 'NetworkStatus':
      choice.value = 4
      break
    case 'PoolStatus':
      choice.value = 5
      break
  }
})

</script>

<style scoped>

</style>