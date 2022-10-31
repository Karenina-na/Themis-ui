import service from "@/network/request";
import { Base64 } from "js-base64";

//登录
export function LoginNetwork(account: string, password: string) {
    const username_enc = Base64.encode(account);
    const password_enc = Base64.encode(password);
    const config = {
        method: 'post',
        url: '/operator/login',
        data: {
            "account": username_enc,
            "password": password_enc
        }
    }
    return service(config);
}

//获取所有服务信息
export function GetAllServers() {
    const config = {
        method: 'get',
        url: '/operator/getInstances'
    }
    return service(config)
}