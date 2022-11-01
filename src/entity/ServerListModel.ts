//命名空间接口     //namespace -> colony -> serverName -> serverList
export type NamespaceInterface = Map<string, ColonyListInterface>

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
//服务器信息类
export class ServerModel implements ServerInterface {
    IP: string = ''
    port: string = ''
    udp_port: string = ''
    name: string = ''
    time: string = ''
    colony: string = ''
    namespace: string = ''
    constructor(s: ServerInterface) {
        this.IP = s.IP
        this.port = s.port
        this.udp_port = s.udp_port
        this.name = s.name
        this.time = s.time
        this.colony = s.colony
        this.namespace = s.namespace
    }
}

//服务器列表实例
class ServerListModel {
    //服务器列表
    private namespaceList: NamespaceInterface = new Map<string, ColonyListInterface>()
    //服务器列表
    public get NamespaceList(): NamespaceInterface {
        return this.namespaceList
    }
    public set NamespaceList(value: any) {
        //转换对象
        const namespaceList: NamespaceInterface = new Map<string, ColonyListInterface>()
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
            namespaceList.set(namespace, colonyList)
        })
        this.namespaceList = namespaceList
    }
    //获取集群名称列表
    public getColonyListByNamespace(namespace: string): Array<string> {
        const colonyList = this.namespaceList.get(namespace)
        if (colonyList) {
            return Array.from(colonyList.keys())
        }
        return []
    }
    //获取指定命名空间和集群下的服务器名称
    public getServerNameListByNamespaceAndColony(naespace: string, colony: string): Array<string> {
        const serverNameList = this.namespaceList.get(naespace)?.get(colony)
        if (serverNameList) {
            return Array.from(serverNameList.keys())
        }
        return []
    }
    //获取指定命名空间、集群和服务名下的服务器列表
    public getServerListByNamespaceAndColonyAndServerName(namespace: string,
        colony: string, serverName: string): Array<ServerModel> {
        return this.namespaceList.get(namespace)?.get(colony)?.get(serverName) || []
    }
}

export function NewServerListModel(): ServerListModel {
    return new ServerListModel()
}