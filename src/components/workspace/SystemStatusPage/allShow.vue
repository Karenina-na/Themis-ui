<template>
  <div>
    <FreshDataButton/>
  </div>
  <div>
    <HostStatus :value="host_info"/>
  </div>
  <div>
    <CpuStatus :value="cpu_info"/>
  </div>
  <div>
    <MemStatus :value="mem_info"/>
  </div>
  <div>
    <DiskStatus :value="disk_info"/>
  </div>
  <div>
    <NetStatus :value="net_info"/>
  </div>
  <div>
    <PoolStatus :value="pool_info"/>
  </div>
</template>

<script lang="ts" setup>
import FreshDataButton from '../SystemStatusPage/FreshDataButton.vue'
import {onMounted, ref, watchEffect} from 'vue';
import HostStatus from './SystemComponents/HostStatus.vue'
import CpuStatus from './SystemComponents/CpuStatus.vue'
import MemStatus from './SystemComponents/MemStatus.vue'
import DiskStatus from './SystemComponents/DiskStatus.vue'
import NetStatus from './SystemComponents/NetStatus.vue'
import PoolStatus from './SystemComponents/PoolStatus.vue'
import {SetupServersStore} from '@/stores/SetupServersStore';
import {GetSchedulerInfo} from "@/network/Manager";
import {ElMessage} from "element-plus";

const store = SetupServersStore()

let host_info = ref()
let cpu_info = ref()
let mem_info = ref()
let disk_info = ref()
let net_info = ref()
let pool_info = ref()

onMounted(() => {
  const status = store.GetSystemStatus()
  if (status) {
    //加载系统状态
    GetSchedulerInfo().then((res) => {
      const status = new Map()
      status.set('host_info', res.data.host_info)
      status.set('cpu_info', res.data.cpu_info)
      status.set('mem_info', res.data.mem_info)
      status.set('disk_info', res.data.disk_info)
      status.set('net_info', res.data.net_info)
      status.set('pool_info', {
        core_num: res.data.pool_core_num,
        max_num: res.data.pool_max_num,
        activate_num: res.data.pool_activate_num,
        job_num: res.data.pool_job_num,
      })
      store.SetSystemStatus(status)
    }, (err) => {
      ElMessage({
        message: 'loading data error: ' + err,
        type: 'error',
        duration: 1000,
      })
    })
  }
  host_info.value = status.get('host_info')
  cpu_info.value = status.get('cpu_info')
  mem_info.value = status.get('mem_info')
  disk_info.value = status.get('disk_info')
  net_info.value = status.get('net_info')
  pool_info.value = status.get('pool_info')
})

//监测系统状态变化
watchEffect(() => {
  const status = store.GetSystemStatus()
  host_info.value = status.get('host_info')
  cpu_info.value = status.get('cpu_info')
  mem_info.value = status.get('mem_info')
  disk_info.value = status.get('disk_info')
  net_info.value = status.get('net_info')
  pool_info.value = status.get('pool_info')
})

</script>

<style scoped>

</style>