import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from 'vue';

export const SetupServersStore = defineStore('SetupServersStore', () => {

    //全局可用命名空间列表名称
    const NamespacesList = ref(new Array<string>);

    // 获取命名空间名称列表
    function GetNamespaceNameList() {
        return NamespacesList.value;
    }

    // 设置命名空间名称列表
    function SetNamespaceNameList(list: string[]) {
        NamespacesList.value = list
    }

    // 长度
    function GetNamespaceNameListLength() {
        return NamespacesList.value.length
    }

    //选取的命名空间
    const Namespace = ref('')

    //获取选取的命名空间
    function GetNamespace() {
        return Namespace.value
    }

    //设置选取的命名空间
    function SetNamespace(namespace: string) {
        Namespace.value = namespace
    }

    //全局可用集群和服务列表名称
    const ColoniesAndInstancesList = ref(new Map());

    // 获取集群和服务名称列表
    function GetColoniesAndInstancesNameList() {
        return ColoniesAndInstancesList.value
    }

    // 设置集群和服务名称列表
    function SetColoniesAndInstancesNameList(list: Map<string, Array<string>>) {
        ColoniesAndInstancesList.value = list
    }

    //系统状态
    const SystemStatus = ref(new Map());

    //获取系统状态
    function GetSystemStatus() {
        return SystemStatus.value
    }

    //设置系统状态
    function SetSystemStatus(status: Map<string, any>) {
        SystemStatus.value = status
    }

    // 全局可用黑名单实例列表
    const BlackListInstancesList = ref(new Array<any>());

    // 获取黑名单实例列表
    function GetBlackListInstancesList() {
        return BlackListInstancesList.value
    }

    // 设置黑名单实例列表
    function SetBlackListInstancesList(list: Array<any>) {
        BlackListInstancesList.value = list
    }

    return {
        GetNamespaceNameList, SetNamespaceNameList, GetNamespaceNameListLength,
        GetNamespace, SetNamespace,
        GetColoniesAndInstancesNameList, SetColoniesAndInstancesNameList,
        GetSystemStatus, SetSystemStatus,
        GetBlackListInstancesList, SetBlackListInstancesList
    }
})

// 热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(SetupServersStore, import.meta.hot))
}