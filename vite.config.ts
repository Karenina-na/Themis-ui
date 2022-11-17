import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    return {
        //加载环境变量  process.env.VITE_*
        define: {
            'process.env': {
                VITE_THEMIS_UI_TITLE: env.VITE_THEMIS_UI_TITLE,
                VITE_THEMIS_URL: JSON.stringify(env.VITE_THEMIS_URL),
                VITE_SERVER_PORT: JSON.stringify(env.VITE_SERVER_PORT),
            }
        },
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: Number(env.VITE_SERVER_PORT),
            proxy: {
                '/api': {
                    target: env.VITE_THEMIS_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
    }
})