
const express = require('express')
const http =require('http')
const path = require('path')
const fs = require('fs')
const bodypaser = require('body-parser')
const { marked } = require('marked')
const cors = require('cors')

const router = require('./router/router')
const app =express()


app.use(cors())
app.use(express.static('./source'))
app.use(bodypaser.urlencoded({extended:false}))
// 获取本地md文件
app.use('/api',router)
app.listen(3300,()=>[
    console.log("express runing at 127.0.0.1:3300")
])