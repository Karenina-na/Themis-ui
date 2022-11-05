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