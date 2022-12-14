<template>
  <div class="singleShow">
    <div class="single_freshData">
      <FreshDataButton/>
    </div>
    <div v-if="choice===0">
      <HostStatus :value="host_info"/>
    </div>
    <div v-if="choice===1" class="Choice_Status">
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
import {GetSchedulerInfo} from "@/network/Manager";
import {ElMessage} from "element-plus";

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

//监听路由参数变化
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
/*总布局*/
.singleShow {
  width: 100%;
}

/*刷新按钮*/
.single_freshData {
  margin-bottom: 20px;
  margin-top: 10px;
  width: 100%;
  text-align: right;
}

/*选择的信息页面布局*/
.Choice_Status {
  margin: auto;
}
</style>