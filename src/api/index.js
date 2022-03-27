import axios from "axios";

const base = {
    baseURL:"http://localhost:3300",
    initialize:'/api/initialize',
    getbloglist:'/api/getbloglist',
    getblogfile:'/api/getblogfile'
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
    }
}

export default api