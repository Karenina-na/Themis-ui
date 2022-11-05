<template>
    <el-scrollbar :height="length">
        <div>
            <HostStatus :value="host_info" />
        </div>
        <div>
            <CpuStatus :value="cpu_info" />
        </div>
        <div>
            <MemStatus :value="mem_info" />
        </div>
        <div>
            <DiskStatus :value="disk_info" />
        </div>
        <div>
            <NetStatus :value="net_info" />
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">

import { GetSchedulerInfo } from '../../network/Manager';
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useLoading } from '../../util/Loading'
import { ref } from 'vue'
import HostStatus from './SystemStatusPage/HostStatus.vue'
import CpuStatus from './SystemStatusPage/CpuStatus.vue'
import MemStatus from './SystemStatusPage/MemStatus.vue'
import DiskStatus from './SystemStatusPage/DiskStatus.vue'
import NetStatus from './SystemStatusPage/NetStatus.vue'

let length = document.documentElement.clientHeight - 110
let host_info = ref()
let cpu_info = ref()
let mem_info = ref()
let disk_info = ref()
let net_info = ref()
let pool_info = ref()

//页面加载系统状态
onMounted(() => {
    useLoading()
    GetSchedulerInfo().then((res) => {
        ElMessage({
            type: 'success',
            message: 'loading system status success',
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
    }, (err) => {
        ElMessage({
            message: 'loading data error: ' + err,
            type: 'error',
            duration: 1000,
        })
    })
    useLoading().endLoading()
})
</script>

<style scoped>

</style>