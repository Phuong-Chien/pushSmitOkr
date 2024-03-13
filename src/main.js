import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'

let app = createApp(App)

async function api(option) {
    let path = option.path || '/lark/api'

    try {
        const host = 'http://192.168.68.110:6840' + path

        let res = await axios({
            url: host + (option.url || ''),
            method: option.method || 'GET',
            data: option.data,
            params: option.params,
            headers: {
                Authorization: localStorage.access_token,
                test: localStorage.test
            }
        })

        // return { success: true, data: res.data }

        return res.data
    } catch (e) {
        let message = e?.response?.data || e.message || 'Unknown'

        return { error: true, message }
    }
}

app.config.globalProperties.$api = api

app.use(router)
app.use(Toast)
app.use(VueApexCharts)

import { useToast } from 'vue-toastification'
const toast = useToast()

app.config.globalProperties.$toast = toast

api({
    path: '/auth/authentication'
}).then(e => {
    localStorage.access_token = e.access_token
    // console.log(e)

    app.mount('#app')
})
