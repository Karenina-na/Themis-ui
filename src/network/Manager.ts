import service from "@/network/request";
import {Base64} from "js-base64";

//登录
export function LoginNetwork(account: string, password: string) {
    const username_enc = Base64.encode(account);
    const password_enc = Base64.encode(password);
    const config = {
        method: 'post',
        url: '/operator/manager/login',
        data: {
            "account": username_enc,
            "password": password_enc
        }
    }
    return service(config);
}

//获取所有命名空间名称
export function GetAllNamespaces() {
    const config = {
        method: 'get',
        url: '/operator/CURD/getNamespaces'
    }
    return service(config)
}

//获取指定命名空间下的集群和服务名称
export function GetColoniesAndInstancesByNamespace(namespace: string) {
    const config = {
        method: 'post',
        url: '/operator/CURD/getColoniesInstances',
        data: {
            "namespace": namespace
        }
    }
    return service(config)
}

//获取黑名单实例
export function GetBlacklistInstances() {
    const config = {
        method: 'get',
        url: '/operator/CURD/getBlacklist'
    }
    return service(config)
}

//删除黑名单实例
export function DeleteBlacklistInstance(namespace: string, colonies: string, instances: string, IP: string, port: string) {
    const config = {
        method: 'delete',
        url: '/operator/CURD/deleteBlacklistInstance',
        data: {
            "namespace": namespace,
            "colony": colonies,
            "name": instances,
            "IP": IP,
            "port": port
        }
    }
    return service(config)
}

//获取调度中心信息
export function GetSchedulerInfo() {
    const config = {
        method: 'get',
        url: '/operator/cluster/getStatus'
    }
    return service(config)
}

//获取指定命名空间、集群、服务的所有实例
export function GetInstancesByNamespaceColoniesInstances(namespace: string, colonies: string, instances: string) {
    const config = {
        method: 'post',
        url: '/operator/CURD/getInstance',
        data: {
            "namespace": namespace,
            "colony": colonies,
            "name": instances
        }
    }
    return service(config)
}

//删除指定实例
export function DeleteInstanceByNamespaceColoniesInstances(namespace: string, colonies: string, instances: string, IP: string, port: string) {
    const config = {
        method: 'delete',
        url: '/operator/CURD/blacklistInstance',
        data: {
            "namespace": namespace,
            "colony": colonies,
            "name": instances,
            "IP": IP,
            "port": port
        }
    }
    return service(config)
}