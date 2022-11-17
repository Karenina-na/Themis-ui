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
import {onMounted, ref} from 'vue';
import HostStatus from './SystemComponents/HostStatus.vue'
import CpuStatus from './SystemComponents/CpuStatus.vue'
import MemStatus from './SystemComponents/MemStatus.vue'
import DiskStatus from './SystemComponents/DiskStatus.vue'
import NetStatus from './SystemComponents/NetStatus.vue'
import PoolStatus from './SystemComponents/PoolStatus.vue'
import {SetupServersStore} from '@/stores/SetupServersStore';

const store = SetupServersStore()

let host_info = ref()
let cpu_info = ref()
let mem_info = ref()
let disk_info = ref()
let net_info = ref()
let pool_info = ref()

onMounted(() => {
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