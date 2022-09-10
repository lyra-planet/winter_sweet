import api from "../api"
import Typed from "typed.js"
import { useState } from "react"
export const yiYan = (yiYanId)=>{
    (async()=>{
      const response =  await api.yiyan()
      const yiYanData = response.data.text
      const options = {
        strings: [yiYanData],
           typeSpeed: 50
       }
       if(options){
        new Typed(yiYanId, options)
         }
    })()
  }

  export const getBlogDataByTitle=title=>async()=>{
        const response = await api.BlogFileLoad(title)
        return response.data
    }