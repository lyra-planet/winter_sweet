import axios from "axios";

const base = {
    baseURL:"http://localhost:3300",
    getMdFile:'/api/getmdfile'
}
const api = {

    //获取服务器中的md文件
    getmdfile(){
        return axios.get(base.baseURL+base.getMdFile)
    },



    // 获取每日一言
    yiyan(){
        return axios.get(`https://api.dzzui.com/api/yiyan?format=json`)
    }
}

export default api