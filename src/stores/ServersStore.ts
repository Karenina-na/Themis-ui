import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { NewServerListModel } from '@/entity/ServerListModel'
import type { NamespaceInterface, ColonyListInterface, ServerModel } from '@/entity/ServerListModel'

//全局可用服务器列表信息
export const useServersStore = defineStore('ServersStore', () => {
    const ServerList = ref(NewServerListModel())

    //更新ServerList
    function updateAllData(serverList: NamespaceInterface) {
        ServerList.value.NamespaceList = serverList
    }
    //更新ColonyList
    function updateColonyData(namespace: string, colonyList: ColonyListInterface) {
        ServerList.value.NamespaceList.set(namespace, colonyList)
    }
    //获取集群名称列表和服务器名称列表
    function getColonyAndServerNameListByNamespace(namespace: string): Map<string, Array<string>> {
        const colonyAndServerNameList = new Map<string, Array<string>>()
        ServerList.value.getColonyListByNamespace(namespace).forEach((colony: string) => {
            colonyAndServerNameList.set(colony,
                ServerList.value.getServerNameListByNamespaceAndColony(namespace, colony))
        })
        return colonyAndServerNameList
    }
    //获取指定集群和指定服务名下的服务器列表
    function getServerListByNamespaceAndColonyAndServerName(namespace: string,
        colony: string, serverName: string): Array<ServerModel> {
        return ServerList.value.getServerListByNamespaceAndColonyAndServerName(namespace, colony, serverName)
    }

    return {
        updateAllData, updateColonyData, getColonyAndServerNameListByNamespace,
        getServerListByNamespaceAndColonyAndServerName
    }
})

// 热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useServersStore, import.meta.hot))
}