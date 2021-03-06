import axios from 'axios'
import store from './store/modules/adCategories'


axios.interceptors.request.use(function(config){
    store.state.isShow=true; //在请求发出之前进行一些操作
    return config
})
//定义一个响应拦截器
axios.interceptors.response.use(function(config){
    store.state.isShow=false;//在这里对返回的数据进行处理
    return config
})

export default axios
