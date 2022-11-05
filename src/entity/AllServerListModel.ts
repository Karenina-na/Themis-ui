import { markRaw } from 'vue'
import type { NamespaceInterface, ColonyListInterface, ServerListInterface, ServerInterface } from './Interface'
import { ServerModel } from './ServerModel'

//服务器列表实例
class ServerListModel {
    //服务器列表
    private List: NamespaceInterface;
    constructor() {
        this.List = new Map<string, ColonyListInterface>()
    }
    //服务器列表
    public get NamespaceList(): NamespaceInterface {
        return this.List
    }
    public Get(): NamespaceInterface {
        return this.List
    }
    public Set(value: any) {
        //转换对象
        const NamesapceName = Object.keys(value)
        const NamesapceValue = Object.values(value)
        NamesapceName.forEach((namespace, index) => {
            const colonyList: ColonyListInterface = new Map<string, ServerListInterface>()
            const colonyName = Object.keys(NamesapceValue[index]!)
            const colonyValue = Object.values(NamesapceValue[index]!)
            colonyName.forEach((colonyName, index) => {
                const serverList: ServerListInterface = new Map<string, Array<ServerInterface>>()
                const serverName = Object.keys(colonyValue[index]!)
                const serverValue = Object.values(colonyValue[index]!)
                serverName.forEach((serverName, index) => {
                    const serverListByServerName: Array<ServerInterface> = []
                    //类型断言
                    const serverValueByServerName = serverValue[index] as Array<ServerInterface>
                    serverValueByServerName.forEach((server: ServerInterface) => {
                        serverListByServerName.push(new ServerModel(server))
                    })
                    serverList.set(serverName, serverListByServerName)
                })
                colonyList.set(colonyName, serverList)
            })
            this.List.set(namespace, colonyList)
        })
    }
    //获取命名空间
    public getNamespaceList(): Array<string> {
        const namespaceList: Array<string> = []
        this.List.forEach((value, key) => {
            namespaceList.push(key)
        })
        return namespaceList
    }

    //获取集群名称列表
    public getColonyListByNamespace(namespace: string): Array<string> {
        const colonyList = this.List.get(namespace)
        if (colonyList) {
            return Array.from(colonyList.keys())
        }
        return []
    }
    //获取指定命名空间和集群下的服务器名称
    public getServerNameListByNamespaceAndColony(naespace: string, colony: string): Array<string> {
        const serverNameList = this.List.get(naespace)?.get(colony)
        if (serverNameList) {
            return Array.from(serverNameList.keys())
        }
        return []
    }
    //获取指定命名空间、集群和服务名下的服务器列表
    public getServerListByNamespaceAndColonyAndServerName(namespace: string,
        colony: string, serverName: string): Array<ServerModel> {
        return this.List.get(namespace)?.get(colony)?.get(serverName) || []
    }
}

export function NewServerListModel(): ServerListModel {
    return markRaw(new ServerListModel())
}