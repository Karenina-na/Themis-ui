import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { NewServerListModel } from '@/entity/ServerListModel'
import type { ColonyListInterface, ServerInterface } from '@/entity/ServerListModel'

//全局可用服务器列表信息
export const useServersStore = defineStore('ServersStore', () => {
    const ServerList = ref(NewServerListModel())

    //更新ServerList
    function updateServerList(serverList: ColonyListInterface) {
        ServerList.value.ColonyList = serverList
    }
    //获取集群名称列表和服务器名称列表
    function getColonyAndServerNameList(): Map<string, Array<string>> {
        const colonyAndServerNameList = new Map<string, Array<string>>()
        ServerList.value.getColonyList().forEach((colony) => {
            colonyAndServerNameList.set(colony, ServerList.value.getServerNameListByColony(colony))
        })
        return colonyAndServerNameList
    }
    //获取指定集群和指定服务名下的服务器列表
    function getServerListByColonyAndServerName(colony: string, serverName: string): Array<ServerInterface> {
        const serverList = ServerList.value.getServerListByColonyAndServerName(colony, serverName)
        if (serverList) {
            return Array.from(serverList)
        }
        return []
    }
    return { updateServerList, getColonyAndServerNameList, getServerListByColonyAndServerName }
})

// 热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useServersStore, import.meta.hot))
}