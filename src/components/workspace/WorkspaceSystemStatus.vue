<template>
  <div class="workspaceSystemStatus_box">
    <el-scrollbar :height="length">
      <div class="single_freshData">
        <FreshDataButton/>
      </div>
      <div v-if="(choice===0 || choice===10)&&host_info!==undefined" class="Choice_Status">
        <HostStatus :value="host_info"/>
      </div>
      <div v-if="(choice===1 || choice===10)&&cpu_info!==undefined" class="Choice_Status">
        <CpuStatus :value="cpu_info"/>
      </div>
      <div v-if="(choice===2 || choice===10)&&mem_info!==undefined" class="Choice_Status">
        <MemStatus :value="mem_info"/>
      </div>
      <div v-if="(choice===3 || choice===10)&&mem_info!==undefined" class="Choice_Status">
        <DiskStatus :value="disk_info"/>
      </div>
      <div v-if="(choice===4 || choice===10)&&mem_info!==undefined" class="Choice_Status">
        <NetStatus :value="net_info"/>
      </div>
      <div v-if="(choice===5 || choice===10)&&mem_info!==undefined" class="Choice_Status">
        <PoolStatus :value="pool_info"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watchEffect} from "vue";
import {SetupServersStore} from "@/stores/SetupServersStore";
import FreshDataButton from '@/components/workspace/SystemStatusPage/FreshDataButton.vue'
import HostStatus from '@/components/workspace/SystemStatusPage/HostStatus.vue'
import CpuStatus from '@/components/workspace/SystemStatusPage/CpuStatus.vue'
import MemStatus from '@/components/workspace/SystemStatusPage/MemStatus.vue'
import DiskStatus from '@/components/workspace/SystemStatusPage/DiskStatus.vue'
import NetStatus from '@/components/workspace/SystemStatusPage/NetStatus.vue'
import PoolStatus from '@/components/workspace/SystemStatusPage/PoolStatus.vue'
import {GetSchedulerInfo} from "@/network/Manager";
import {ElMessage} from "element-plus";
import {useLoading} from "@/util/Loading";
import {useRoute} from 'vue-router'

const router = useRoute()
const store = SetupServersStore()
const length = document.documentElement.clientHeight - 110
let host_info = ref()
let cpu_info = ref()
let mem_info = ref()
let disk_info = ref()
let net_info = ref()
let pool_info = ref()

let choice = ref(10)

//初始化
onMounted(() => {
  GetSystemStatus()
})

//监测数据变化
watchEffect(() => {
  const status = store.GetSystemStatus()
  if (status !== undefined) {
    host_info.value = status.get('host_info')
    cpu_info.value = status.get('cpu_info')
    mem_info.value = status.get('mem_info')
    disk_info.value = status.get('disk_info')
    net_info.value = status.get('net_info')
    pool_info.value = status.get('pool_info')
  }
})

//监测路由信息改变
watchEffect(() => {
  UpdateSystemStatus()
})

//根据路由参数改变显示dom
function UpdateSystemStatus() {
  let params = router.query.status
  if (params === 'HostStatus') {
    choice.value = 0
  } else if (params === 'CpuStatus') {
    choice.value = 1
  } else if (params === 'MemStatus') {
    choice.value = 2
  } else if (params === 'DiskStatus') {
    choice.value = 3
  } else if (params === 'NetworkStatus') {
    choice.value = 4
  } else if (params === 'PoolStatus') {
    choice.value = 5
  } else {
    choice.value = 10
  }
}

//获取系统状态
function GetSystemStatus() {
  useLoading()
  GetSchedulerInfo().then((res) => {
    ElMessage({
      message: 'loading data success',
      type: 'success',
      duration: 1000,
    })
    host_info.value = res.data.host_info
    cpu_info.value = res.data.cpu_info
    mem_info.value = res.data.mem_info
    disk_info.value = res.data.disk_info
    net_info.value = res.data.net_info
    pool_info.value = {
      core_num: res.data.pool_core_num,
      max_num: res.data.pool_max_num,
      activate_num: res.data.pool_activate_num,
      job_num: res.data.pool_job_num,
    }
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
/*总布局*/
.workspaceSystemStatus_box {
  width: 100%;
  height: 100%;
}

/*刷新按钮布局*/
.single_freshData {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
}
</style>