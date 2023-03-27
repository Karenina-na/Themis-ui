<template>
  <div v-if="display" class="ServerContainer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="Server_info_title">{{ prop.server.IP }}</span>
        </div>
      </template>
      <div class="Server_info_name">Name :
        <div class="Server_info_value">{{ prop.server.name }}</div>
      </div>
      <hr/>
      <div class="Server_info_name">Port :
        <div class="Server_info_value">{{ prop.server.port }}</div>
      </div>
      <hr/>
      <div class="Server_info_name">UDP listen port :
        <div class="Server_info_value">{{ prop.server.udp_port }}</div>
      </div>
      <hr/>
      <div class="Server_info_name">Time :
        <div class="Server_info_value">{{ prop.server.time }}</div>
      </div>
      <hr/>
      <div class="Server_info_name">Colony :
        <div class="Server_info_value">{{ prop.server.colony }}</div>
      </div>
      <hr/>
      <div class="Server_info_name">Namespace :
        <div class="Server_info_value">{{ prop.server.namespace }}</div>
      </div>
      <hr/>
      <div class="server-delete-button">
        <el-button plain type="danger" @click="Delete_server">Delete</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import {ElMessage, ElMessageBox} from "element-plus";
import {markRaw, ref} from "vue";
import WifiIcon from "@/components/WifiIcon.vue";
import {useLoading} from "@/util/Loading";
import {DeleteInstanceByNamespaceColoniesInstances} from "@/network/Manager";

const prop = defineProps(['server'])
let display = ref(true)

//删除该服务
function Delete_server() {
  ElMessageBox.confirm(
      '<div style="margin-left:40px;font-size:15px;">' + 'Are you sure to delete this server? '
      + "<div style='font-size:16px;font-weight:400;margin:auto'>IP : " +
      "<span style='font-weight:700;font-size:15px;padding-left:20px;'>" + prop.server.IP + "</span>" +
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
    DeleteInstanceByNamespaceColoniesInstances(prop.server.namespace, prop.server.colony, prop.server.name, prop.server.IP, prop.server.port).then(res => {
      if (res.data === true) {
        ElMessage({
          message: 'delete success',
          type: 'success',
          duration: 1000,
        })
        display.value = false
      } else {
        ElMessage({
          message: 'delete error: ' + res.data,
          type: 'error',
          duration: 1000,
        })
      }
    }, (err) => {
      ElMessage({
        message: 'delete error: ' + err,
        type: 'error',
        duration: 1000,
      })
    }).finally(() => {
      useLoading().endLoading()
    })
    useLoading().endLoading()
  }).catch(() => {
    ElMessage({
      type: 'warning',
      message: 'cancel operation',
    })
  })
}
</script>

<style scoped>
/*盒子布局*/
.ServerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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
  width: 350px;
  height: 480px;
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

/*名称*/
.Server_info_title {
  font-size: 25px;
  text-align: center;
  width: 100%;
  font-weight: bold;
}

/*信息字段*/
.Server_info_name {
  font-size: 16px;
  padding: 6px 7px;
  text-align: left;
  line-height: 35px;
  transition: all 0.3s;
  margin-top: 8px;
}

.dark .Server_info_name:hover {
  background-color: #edede9;
  color: #303133;
  font-size: 18px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.light .Server_info_name:hover {
  background-color: #ccff33;
  font-size: 18px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.Server_info_value {
  font-weight: normal;
  text-align: center;
  display: inline-block;
  width: 150px;
  float: right;
}

/*按钮布局*/
.server-delete-button {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 10px;
}
</style>