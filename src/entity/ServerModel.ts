import type { ServerInterface } from "./Interface"

// 服务器信息类
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