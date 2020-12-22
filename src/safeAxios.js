import axios from "axios"
import Global from './global';
import { Message } from 'element-ui';
let safeAxios = axios.create({
    baseURL: Global.SERVER_MAIN,
    timeout: 60000,
});

//请求拦截器
safeAxios.interceptors.request.use((config) => {
    //请求体
    if (config.method === 'post') {
        //headers封装
        config.headers.y = new Date().getTime()
        if (window.sessionStorage.getItem("Token")) {
            config.headers.token = window.sessionStorage.getItem("Token");
        }
        //data封装
        // if (Global.ENCRYPT) {
        //     config.data = recursionEncrypt(config.data)
        // }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//响应拦截器
safeAxios.interceptors.response.use((res) => {
    //返回体
    if (res.status == 200) {
        let code = res.data.code
        if (code == 1) {
            return res.data.data;
        } else {
            Message.error("业务错误&错误码：" + code + "错误信息：" + res.data.message);
            if (code == -1) {
                Message({
                    type: "error",
                    message: "登陆过期，请重新登陆！"
                })
                window.sessionStorage.clear();
                // window.sessionStorage.removeItem("Token");
                // window.sessionStorage.removeItem("roleId");
                // window.sessionStorage.removeItem("UserName");
                window.location.href = "/";
            }
            // window.console.log("业务错误&错误码：" + code + "错误信息：" + res.data.message);
        }
    } else {
        // window.console.log("HTTP错误码&" + res.status);
        Message.error("HTTP错误码&" + res.status);
    }
    return Promise.reject(res);
}, (error) => {
    return Promise.reject(error);
});

export default safeAxios