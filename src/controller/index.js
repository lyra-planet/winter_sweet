import React, { Component } from 'react'
import api from '../api'



const controller={
    custom(){
        let data ={} 
        api.custom().then(res=>{
            data=res.data.data
        console.log(data)
        })
    }
}
export default controller