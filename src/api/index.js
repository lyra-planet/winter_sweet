import axios from "axios";

const base = {
    baseURL:"http://localhost:3300",
    getMdFile:'/api/getmdfile'
}
const api = {

    //初始化
    Initialize(){
        return axios.post(base.baseURL+base.getMdFile,{index:0})
    },
    // 数据区块更新
    BlockUpdate(index){
        return axios.post(base.baseURL+base.getMdFile,{index:index})
    },
    // 获取每日一言
    yiyan(){
        return axios.get(`https://api.dzzui.com/api/yiyan?format=json`)
    }
}

export default api