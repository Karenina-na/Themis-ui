import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import { NewServerListModel } from '@/entity/AllServerListModel'
import type { NamespaceInterface } from '@/entity/Interface'

//全局可用服务器列表信息
export const AllServerStore = defineStore('AllServerStore', () => {
    const ServerList = ref(NewServerListModel())

    //判断是否有数据
    const hasData = () => {
        return ServerList.value.NamespaceList.size > 0
    }
    //更新ServerList
    function updateAllData(serverList: NamespaceInterface) {
        ServerList.value.Set(serverList)
    }
    //获取ServerList
    function getAllData() {
        return ServerList.value.Get()
    }
    //获取命名空间名称列表
    function getNamespaceNameList() {
        return ServerList.value.getNamespaceList()
    }
    //获取对应命名空间的集群名称列表
    function getColonyNameList(namespace: string) {
        return ServerList.value.getColonyListByNamespace(namespace)
    }
    //获取对应集群的服务器名称列表
    function getServerNameList(namespace: string, colony: string) {
        return ServerList.value.getServerNameListByNamespaceAndColony(namespace, colony)
    }
    //获取对应服务器的服务器信息
    function getServerInfo(namespace: string, colony: string, serverName: string) {
        return ServerList.value.getServerListByNamespaceAndColonyAndServerName(namespace, colony, serverName)
    }
    return { hasData, updateAllData, getAllData, getNamespaceNameList, getColonyNameList, getServerNameList, getServerInfo }
})

// 热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(AllServerStore, import.meta.hot))
}