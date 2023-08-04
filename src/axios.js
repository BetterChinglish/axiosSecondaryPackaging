import axios from "axios";
import router from "./router";
// baseURL
// timeout
// header
// responseType
// withCredentials

// 引入白名单
// @ is an alias to /src
import whiteList from "@network/precondition/whiteList";

let request = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 30 * 1000,
    responseType: 'json',

    // 项目特殊header
    headers:{
        'a': 'testA',
    },


})

request.interceptors.request.use((config)=>{
    // token
    // 那些页面的请求需要token, 哪些不需要
    // 设置一个白名单, 引入后使用
    let url = config.url;
    
    // 当当前请求url不属于白名单时
    // 说明需要token, 则获取token添加入config
    let token = localStorage.getItem("token");
    if(whiteList.indexOf(url)===-1 && token) {
        // 根据后端要求进行添加authorization
        // 或使用自定义请求头
        config.headers.Authorization = token;
    }

    // 需要token但是没登陆过没存token等情况
    // 如果向需要token的接口发送请求
    // 后端会返回未认证的错误, 可以在响应拦截里统一处理
    // 所以这里放着, 最后也让他发送请求, 后续响应拦截再处理, 这里就不管他
    else if(whiteList.indexOf(url)===-1 && !token) {
        
    }
    // 处于白名单的页面
    else {
        // 不需要认证
        // 需要其他处理则进行其他处理

    }
    
    // 将配置返回, 如果不返回则不发送请求
    return config;
}, err => {
    // 对请求错误做些什么

    // 一般请求无错误, 不做处理
    // 如要处理可以在此进行

    return Promise.reject(err);
})

request.interceptors.response.use((res)=>{
    // 响应的统一处理

    // 获取响应状态码
    let status = res.data.code;
    // 获取响应提示消息
    let message = res.data.msg;

    // 根据响应状态码处理各种情况
    switch (status) {
        case 404:
            // 跳转到404not found页面

            return Promise.reject(new Error(message))
            break;
        case 401:
            // 401无权限
            // 可以处理无权限情况, 例如跳转到登录页面等

            break;
        // 其他的可以一一处理或处理几个重要的
        // 根据实际情况和后端情况进行处理
        default:
            break;
    }

    // 兜底, 如果要处理错误也可以使用返回的数据处理
    // 具体情况看前端需求进行更改
    if(status!= 200) {
        return  Promise.reject(new Error(status + ': ' + message))
    }




}, err=>{
    // 使用组件进行消息提示等, 这里用alert代替
    alert(err);

    return Promise.reject(new Error(err));
})


// 暴露出去
export default {
    request
};