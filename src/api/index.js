import axios from "axios";

const base = {
    baseURL:" http://47.101.185.55:3333",
    initialize:'/api/initialize',
    getbloglist:'/api/getbloglist',
    getblogfile:'/api/getblogfile',
    getintroucdtion:'/api/getintroduction',
    getgrocery:'/api/getgrocery'
}
const api = {

    //初始化
    Initialize(){
        return axios.post(base.baseURL+base.initialize)
    },
    // 数据区块更新
    BlockUpdate(index){
        return axios.post(base.baseURL+base.getbloglist,{index})
    },
    // 博客文件的加载
    BlogFileLoad(title){
        return axios.post(base.baseURL+base.getblogfile,{title})
    },
    // 获取每日一言
    yiyan(){
        return axios.get(`https://api.dzzui.com/api/yiyan?format=json`)
    },
    // 获取个人介绍
    Grocery(){
        return axios.post(base.baseURL+base.getgrocery)
    },
    // 获取个人介绍
    Introduction(){
        return axios.post(base.baseURL+base.getintroucdtion)
    }
}

export default api