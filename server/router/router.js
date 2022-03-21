const { rejects } = require("assert")
const express = require("express")
const router = express.Router()
const fs = require('fs')
const marked= require('marked')

function readFile(filepath){
    return new Promise((resolve,reject)=>{ 
        let dataAfter = []   
        fs.readdir('./source/post',(err,files)=>{
        console.log(files)                         
                files.forEach(data=>{
                fs.readFile(`./source/post/${data}`,(err,data2)=>{  
                   if(err) console.log(err)      
                   let data3 = marked.parse(data2.toString('utf-8'))                   
                   dataAfter.push(`${data3}`)           
                })
               })
                  
            })
            resolve(dataAfter)   
    })
    
}

router.get('/getmdfile',function(req,res){   
   readFile('./source/post').then(data=>{setTimeout(()=>{
    res.send(data)
   },10)})
   
})

module.exports = router