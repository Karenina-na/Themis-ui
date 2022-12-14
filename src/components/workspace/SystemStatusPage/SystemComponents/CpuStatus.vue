<template>
  <div class="CpuStatus_container">
    <div class="Left_container">
      <el-card v-for="(cpu_info, index) in props.value" :key="index" class="box-card">
        <template #header>
          <div class="card-header">
            <span class="CPU_info_title">{{ cpu_info.cpu_name }}</span>
          </div>
        </template>
        <div class="CPU_info_name">CPU Cores Num:
          <div class="CPU_info_value">{{ cpu_info.cpu_core_num }}</div>
        </div>
        <div class="CPU_info_name">CPU Frequency:
          <div class="CPU_info_value">{{ cpu_info.cpu_frequency }}</div>
        </div>
        <div class="CPU_info_name">CPU Vendor ID:
          <div class="CPU_info_value">{{ cpu_info.cpu_vendor_id }}</div>
        </div>
        <div class="CPU_info_name">CPU Physical ID:
          <div class="CPU_info_value">{{ cpu_info.cpu_physical_id }}</div>
        </div>
      </el-card>
    </div>
    <div class="Right_container">
      <div id="CPU_Usage_Chart" style="width: 500px"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, watch} from "vue";
import * as echarts from "echarts";
import {DarkTheme} from "@/assets/json/DarkTheme";
import {LightTheme} from "@/assets/json/LightTheme";
import {useGlobalStore} from "@/stores/GlobalStore";

const props = defineProps(['value'])
let CPU_Usage_Chart: any = null;
const store = useGlobalStore()

//初始化
onMounted(() => {
  if (props.value) {
    let CPU_usage = []
    for (let i = 0; i < props.value.length; i++) {
      CPU_usage.push(props.value[i].cpu_usage)
    }
    CPU_Usage(CPU_usage);
  } else {
    CPU_Usage([0]);
  }
});

//销毁图标
onUnmounted(() => {
  CPU_Usage_Chart.dispose();
});

//侦测器监听父组件传参
watch(props, (newVal) => {
  let CPU_usage = []
  for (let i = 0; i < props.value.length; i++) {
    CPU_usage.push(newVal.value[i].cpu_usage)
  }
  CPU_Usage(CPU_usage)
});

//监听Theme变化
watch(store.getTheme, () => {
  if (!props.value) {
    return
  }
  CPU_Usage_Chart.dispose();
  let CPU_usage = []
  for (let i = 0; i < props.value.length; i++) {
    CPU_usage.push(props.value[i].cpu_usage)
  }
  CPU_Usage(CPU_usage);
});

//绘制CPU使用率
const CPU_Usage = function (usage: Array<number>) {
  if (store.getTheme() == "light") {
    echarts.registerTheme('LightTheme', LightTheme)
    CPU_Usage_Chart = echarts.init(document.getElementById("CPU_Usage_Chart")!, 'LightTheme', {height: 300 * usage.length});
  } else {
    echarts.registerTheme('DarkTheme', DarkTheme)
    CPU_Usage_Chart = echarts.init(document.getElementById("CPU_Usage_Chart")!, 'DarkTheme', {height: 300 * usage.length});
  }
  let data = []
  for (let i = 0; i < usage.length; i++) {
    let percent = ((i + 1) / usage.length - i / usage.length) * 60
    data.push({
      name: 'CPU' + (i + 1),
      type: 'pie',
      radius: '50%',
      center: ['50%', percent + '%'],
      stillShowZeroSum: false,
      data: [
        {value: usage[i], name: 'CPU Usage'},
        {value: 100 - usage[i], name: 'CPU Idle'},
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    })
  }
  CPU_Usage_Chart.setOption({
    title: {
      text: 'CPU Usage',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: data,
  });
  window.onresize = function () {//自适应大小
    CPU_Usage_Chart.resize();
  };
}

</script>

<style scoped>

/*总布局*/
.CpuStatus_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 1050px;
  margin: auto;
}

/*卡片布局*/
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.box-card {
  width: 480px;
  height: 300px;
  border-radius: 6px;
  transition: all 0.3s;
}

.box-card:hover {
  transition: all 0.3s;
  border-radius: 6px;
}

.light .box-card:hover {
  background: #ffffff;
  box-shadow: 7px 7px 14px #c4c4c4,
  -7px -7px 14px #ffffff;
  transition: all 0.3s;
}

.dark .box-card:hover {
  background: #1d1e1f;
  box-shadow: 7px 7px 14px #161718,
  -7px -7px 14px #242526;
  transition: all 0.3s;
}


/*左右布局*/
.Left_container .Right_container {
  height: 100%;
}


/*名称*/
.CPU_info_title {
  font-size: 20px;
  text-align: center;
  width: 100%;
  font-weight: bold;
}

/*CPU使用率Echart样式*/
#CPU_Usage_Chart {
  transition: all 0.3s;
  border-radius: 2px;
  border: 1px solid #0000001f;
  box-shadow: var(--el-box-shadow-light);
}

#CPU_Usage_Chart:hover {
  transition: all 0.3s;
  border-radius: 6px;
}

.light #CPU_Usage_Chart:hover {
  background: #ffffff;
  box-shadow: 7px 7px 14px #c4c4c4,
  -7px -7px 14px #ffffff;
  transition: all 0.3s;
}

.dark #CPU_Usage_Chart:hover {
  background: #1d1e1f;
  box-shadow: 7px 7px 14px #161718,
  -7px -7px 14px #242526;
  transition: all 0.3s;
}

/*CPU信息字段*/
.CPU_info_name {
  font-size: 14px;
  padding: 6px 7px;
  text-align: left;
  line-height: 35px;
  transition: all 0.3s;
}

.dark .CPU_info_name:hover {
  background-color: #edede9;
  color: #303133;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.light .CPU_info_name:hover {
  background-color: #caf0f8;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.CPU_info_value {
  font-weight: normal;
  text-align: center;
  display: inline-block;
  width: 150px;
  float: right;
}
</style>