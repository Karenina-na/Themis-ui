<template>
  <div>
    <div>
      <HostStatus v-if="choice.value===0" :value="host_info"/>
    </div>
    <div>
      <CpuStatus v-if="choice.value===1" :value="cpu_info"/>
    </div>
    <div>
      <MemStatus v-if="choice.value===2" :value="mem_info"/>
    </div>
    <div>
      <DiskStatus v-if="choice.value===3" :value="disk_info"/>
    </div>
    <div>
      <NetStatus v-if="choice.value===4" :value="net_info"/>
    </div>
    <div>
      <PoolStatus v-if="choice.value===5" :value="pool_info"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HostStatus from './HostStatus.vue'
import CpuStatus from './CpuStatus.vue'
import MemStatus from './MemStatus.vue'
import DiskStatus from './DiskStatus.vue'
import NetStatus from './NetStatus.vue'
import PoolStatus from './PoolStatus.vue'
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