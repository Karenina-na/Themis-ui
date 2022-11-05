import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue';

export const SetupServersStore = defineStore('SetupServersStore', () => {

    //全局可用命名空间列表名称
    let NamespacesList: Array<string> = [];

    // 获取命名空间名称列表
    function GetNamespaceNameList() {
        return NamespacesList
    }

    // 设置命名空间名称列表
    function SetNamespaceNameList(list: string[]) {
        NamespacesList = list
    }

    // 长度
    function GetNamespaceNameListLength() {
        return NamespacesList.length
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

    return {
        GetNamespaceNameList, SetNamespaceNameList, GetNamespaceNameListLength,
        GetNamespace, SetNamespace,
        GetColoniesAndInstancesNameList, SetColoniesAndInstancesNameList
    }
})

// 热更新
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(SetupServersStore, import.meta.hot))
}