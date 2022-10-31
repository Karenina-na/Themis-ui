<template>
    <div class="Login-box">
        <h1 class="Login-project-name" id="Login-project-name">Themis</h1>
        <h1 class="Login-sign-title" id="Login-sign-title">Sign in to your account</h1>
        <el-input v-model="account" ref="focus_account" :prefix-icon="User" placeholder="Please input your account"
            clearable maxlength="20" />
        <el-input v-model="password" ref="focus_password" :prefix-icon="Tools" type="password"
            placeholder="Please input password" show-password clearable maxlength="20" />
        <div class="Login-remember-button">
            <el-switch class="Login-remember-button-label" v-model="remember_data" size="large" inline-prompt
                active-text="Yes" inactive-text="No" style="--el-switch-on-color: #626aef;" active-value="true"
                inactive-value="false" />
            <span class="Login-remember-button-label">Remember me</span>
        </div>
        <div>
            <el-button class="Login-button" id="button-login" type="primary" plain @click="login" size="large"
                :class="{ shake: buttonShakeBool }">
                Sign in
            </el-button>
            <el-button class="Login-button" id="button-reset" type="warning" plain @click="reset" size="large">
                Reset</el-button>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { ref, h, onMounted } from 'vue'
import { ElNotification as ElMessage } from 'element-plus'
import { User, Tools } from '@element-plus/icons-vue'
import { ElLoading, } from 'element-plus'
import { useRouter } from 'vue-router'

import { useGlobalStore } from '@/stores/GlobalStore'
import { getCookie, setCookie } from '@/util/cookie.js'
import { LoginNetwork } from '@/network/Manager'

const router = useRouter()
const GlobalStore = useGlobalStore()
let account = ref('')
let password = ref('')
let remember_data = ref()

let focus_account = ref()
let focus_password = ref()

//获取cookie
onMounted(() => {
    const UserData = getCookie(document.cookie)
    if (UserData.BOOL) {
        remember_data.value = "true"
        account.value = UserData.account!
        password.value = UserData.password!
    }
})

//登录
const login = () => {
    if (check_account() && check_password()) {
        //加载动画
        const loadingInstance = ElLoading.service({
            fullscreen: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        LoginNetwork(account.value, password.value).then((res) => {
            ElMessage({
                message: 'sign in success',
                type: 'success',
                duration: 1000,
            })
            if (remember_data.value == "true") {
                setCookie(account.value, password.value, 7)
            } else {
                setCookie(account.value, password.value, 0)
            }
            GlobalStore.updateUsername(account.value)
            GlobalStore.updatePassword(password.value)
            GlobalStore.updateToken(res.data.token)
            router.push({
                path: '/workspace',
            })
        }, (err) => {
            ElMessage({
                message: 'sign in error:' + err,
                type: 'error',
                duration: 1000,
            })
            buttonShake()
            focus_account.value.focus()
        }).finally(() => {
            loadingInstance.close()
        })
    }
}

//重置
const reset = () => {
    account.value = ''
    password.value = ''
    remember_data.value = "false"
    focus_account.value.focus()
}

//检查
function check_account(): boolean {
    if (account.value === '') {
        ElMessage({
            showClose: false,
            message: h('p', null, [
                h('i', { style: 'color:#e6a23c;font-size:16px' }, 'account cannot be  '),
                h('span', { style: 'color:rgb(255 0 0);font-size:18px' }, 'empty'),
            ]),
            type: 'warning',
        })
        focus_account.value.focus();
        buttonShake()
        return false
    }
    return true
}
function check_password(): boolean {
    if (password.value === '') {
        ElMessage({
            showClose: false,
            message: h('p', null, [
                h('i', { style: 'color:#e6a23c;font-size:16px' }, 'password cannot be  '),
                h('span', { style: 'color:rgb(255 0 0);font-size:18px' }, 'empty'),
            ]),
            type: 'warning',
        })
        focus_password.value.focus();
        buttonShake()
        return false
    }
    return true
}

//按钮晃动
const buttonShakeBool = ref(false)
function buttonShake() {
    buttonShakeBool.value = true
    setTimeout(() => {
        buttonShakeBool.value = false
    }, 1500)
}
</script>

<style scoped>
@import '@/assets/css/shake.css';

/**登录盒子 */
.Login-box {
    text-align: center;
    margin: auto;
    margin-top: 12%;
    user-select: none;
    width: 600px;
}

/**图片样式 */
.Login-project-name {
    font-size: 100px;
    font-weight: 900;
    margin: auto;
    --vt-font-family-base: Quotes, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

/**sign-title */
.Login-sign-title {
    font-size: 30px;
    font-weight: 1000;
    margin-bottom: 20px;
}

/**输入框 */
.Login-box .el-input {
    font-size: 18px;
    height: 50px;
    width: 500px;
    margin: 4px;
}

.Login-box .el-input__inner {
    height: 50px;
    border-radius: 10px;
    margin-bottom: 20px;
}

/**remember-button 和 theme-button*/
.Login-remember-button {
    margin: 10px 0 12px 70px;
    display: flex;
}

.Login-emember-button .Login-remember-button-label {
    font-size: 17px;
    padding: 0 10px;
}

.Login-remember-button span {
    line-height: 42px;
    padding-left: 10px;
}

/*顶部栏 */


/**登录、重置按钮 */
.Login-box .Login-button {
    padding: 0 40px;
    font-size: 17px;
}

.Login-box #button-login {
    margin: 0 60px 0 0;
}

.Login-box #button-reset {
    margin: 0 0 0 60px;
}
</style>