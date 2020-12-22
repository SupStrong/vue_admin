let dev = {
    baseUrl:'http://127.0.0.1:7001'
}
let prod = {
    baseUrl:'http://127.0.0.1:7001'
}

var env = null;
switch (process.env.NODE_ENV) {
    case "development": // dev环境
    env = dev;
        break;
    case "prod": // prod
    env = prod;
        break;
    default:
        console.log("环境信息异常!");
}
// 将环境信息做整合
export default env;
