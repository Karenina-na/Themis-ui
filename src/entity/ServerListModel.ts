//集群列表接口    //colony -> serverName -> server
export type ColonyListInterface = Map<string, ServerListInterface>

//服务器列表接口    //serverName -> server
export type ServerListInterface = Map<string, Array<ServerInterface>>

//服务器信息接口
export interface ServerInterface {
    IP: string,
    port: string,
    udp_port: string,
    name: string,
    time: string,
    colony: string,
    namespace: string,
}

//服务器列表实例
class ServerListModel {
    //服务器列表
    private colonyList: ColonyListInterface = new Map<string, ServerListInterface>()
    //服务器列表
    public get ColonyList(): ColonyListInterface {
        return this.colonyList
    }
    //服务器列表
    public set ColonyList(value) {
        this.colonyList = value
    }
    //获取集群名称列表
    public getColonyList(): Array<string> {
        const colonys: Array<string> = []
        this.colonyList.forEach((value, key) => {
            colonys.push(key)
        })
        return colonys
    }
    //获取指定集群下的服务器名称
    public getServerNameListByColony(colony: string): Array<string> {
        const serverNameList: Array<string> = []
        const colonys = this.ColonyList.get(colony)
        if (colonys) {
            colonys.forEach((value, key) => {
                serverNameList.push(key)
            })
        }
        return serverNameList
    }
    //获取指定集群和服务名下的服务器列表
    public getServerListByColonyAndServerName(colony: string, serverName: string): Array<ServerInterface> {
        const serverList = this.ColonyList.get(colony)?.get(serverName)
        if (serverList) {
            return Array.from(serverList)
        }
        return []
    }
}

export function NewServerListModel(): ServerListModel {
    return new ServerListModel()
}