const express = require('express') //引入express 模块
const config = require('config') //加载config模块
const logger = require('morgan') //加载日志模块
const app = express() //创建实例

const router = express.Router()

//引入解析formdata模块
const multiparty = require('multiparty');
//引入文件读写模块
const fs = require('fs')
//引入处理post模块
const bodypaser = require('body-parser')
//引入md文件处理模块
const marked = require('marked')
//引入跨域解决模块
const cors = require('cors')
//引入mysql 模块
const mysql = require('mysql')
// 引入yaml文件解析模块
const yaml = require('js-yaml')

app.use(logger("dev")) //调用日志,配置为dev模式
//使用请求的模块
app.use(bodypaser.urlencoded({
  extended: false
}))

app.use(bodypaser.json())

app.use(cors()) //解决跨域问题

// 创建数据库连接 填入数据库信息 
const conn = mysql.createConnection({
  user: 'root', //用户名
  password: 'ck781208', //密码
  host: '47.101.185.55', //主机
  database: 'blog_md_database', //数据库名
  charset: 'UTF8MB4'
})
// 测试连接
conn.connect(err => {
  console.log(err, '如果为null 就是连接成功');
})

readFile('./source/post')
//--------------------------------------------------------------------------
//测试专区
let content = fs.readFileSync("./source/custom.yaml",{encoding:"utf8"})
let result=yaml.load(content)
console.log(result)


//--------------------------------------------------------------------------
// 初始化
app.post('/api/initialize', (req, res) => {
  readFile('./source/post')
  let MYSQL_STR = `select title,tags_str,classes_str,createtime,updatetime from md_database where type='0'`
  
  let content = fs.readFileSync("./source/custom.yaml",{encoding:"utf8"})
  let result=yaml.load(content)
  
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err

    res.send({
      data:BlogListReverse(data),
      custom:result})
  })
})

//数据博客表单懒加载发送 不需要发送文章内容
app.post('/api/getbloglist', (req, res) => {
  console.log(req.body)
  let MYSQL_STR = `select title,tags_str,classes_str,review,createtime,updatetime from md_database where type='0'`
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err
    let length = BlogListLazy(BlogListReverse(data)).block_length
    let data2 = BlogListLazy(BlogListReverse(data)).block_data
    res.send({
      block_data: data2[req.body.index],
      // block_data: data2,
      block_length: length
    })
  })
})

app.post('/api/getintroduction',(req,res)=>{
  let MYSQL_STR = `select data,createtime,updatetime from md_database where type='1' `
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err
    res.send({
      data:data,
      code:20000
    })
  })
})
app.post('/api/getgrocery',(req,res)=>{
  let MYSQL_STR = `select data,createtime,updatetime from md_database where type='2' `
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err
    res.send({
      data:data,
      code:20000
    })
  })
})
// ---------------------------------------------------
//负责后台

//传输所有文件
app.post(`/api/getbloglist2`, (req, res) => {
  console.log(req.query)
  let MYSQL_STR = `select status,title,tags_str,classes_str,review,createtime,updatetime from md_database where type='0'`
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err
    let data2 = BlogListReverse(data)
    res.send({
      code: 20000,
      data: {
        block_data: data2,
      }
    })
  })
})
app.post(`/api/sendblogfile`, (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function (err, fields, file) {
    fs.readFile(file.upfile[0].path, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(file.upfile[0].originalFilename)
      console.log(data)
      BlogHandle(data,file.upfile[0].originalFilename)
    })
  })

  res.send({
    code: 20000
  })
})
// ---------------------------------------------------


// 点击博客页面发送文章内容
app.post('/api/getblogfile', (req, res) => {
  let MYSQL_STR = `select * from md_database where title='${req.body.title}' and type='0'`
  conn.query(MYSQL_STR, (err, data) => {
    res.send(data)
  })
})

// BLogList数据翻转
BlogListReverse = (data_str) => {
  const DataHaventReverse = data_str
  let DataReverse = []
  for (let i = DataHaventReverse.length - 1; i >= 0; i--) {
    DataReverse.push(DataHaventReverse[i])
  }
  return DataReverse
}


//实现数据的懒加载
BlogListLazy = (data_str) => {
  const DataBefore = data_str
  let length = DataBefore.length
  const DataAfter = []
  // 五个为一组 获取组数
  let block_length = parseInt(length / 5)
  //获取余数
  const block_left = length % 5
  if (block_left != 0) {
    block_length++
  }
  for (let i = 0; i < block_length; i++) {
    const Block = DataBefore.slice(0 + i * 5, 5 + i * 5)
    DataAfter.push(Block)
  }
  return {
    block_length: block_length,
    block_data: DataAfter

  }
}
// Mysql监听BLog文件的改变并修改
function readFile(filepath) {
  let dataAfter
  fs.readdir('./source/post', (err, files) => {
    files.forEach(data => {
      fs.readFile(`./source/post/${data}`, (err, data2) => {
        if (err) console.log(err)
        BlogHandle(data2,data,0)
      })

    })
  })
      fs.readFile(`./source/aboutme/aboutme.md`, (err, data2) => {
        if (err) console.log(err)
        BlogHandle(data2,'aboutme.md',1)
      })
      fs.readFile(`./source/grocery/grocery.md`, (err, data2) => {
        if (err) console.log(err)
        BlogHandle(data2,'grocery.md',2)
      })
}

// 博客文章解析
function BlogHandle(data,name,type) {
  let data3 = marked.parse(data.toString('utf-8'))
  //---------------------处理数据----------------------
  // 第一次配对将<!-- more -->之前的内容提取出来
  let patterned = data3.match(/[\s\S]*<!-- more -->/)[0]
  // console.log(patterned)
  // 将博客文章数据提取出来
  let blogdata = data3.replace(patterned, '')
  // 第二次配对将标签卡提取出来
  let patterneCard = patterned.match(/<hr>[\s\S]*<hr>/)[0]
  // console.log(patterneCard)
  //将预览内容展示出来
  let review = patterned.replace(patterneCard, '')
  //将标签卡细化提取
  patterneCard = patterneCard.match(/<p>[\s\S]*<\/p>/)[0]
  // console.log(patterneCard)
  //将标题从标签卡中提取出来 将标题提示符去除
  let title = patterneCard.match(/title:.*\n/)[0].replace('\n', '').replace(/title:[ ]/, '')
  //将标签集从标签卡中提取出来 将标签提示符去除
  let tags_str = patterneCard.match(/tags:.*\n/)[0].replace('\n', '').match(/[' '].*/)[0]
  //将类集从标签卡中提取出来 将类提示符去除 并分割变成数组
  let classes_str = patterneCard.match(/class:.*<\/p>/)[0].replace(/<\/p>/, '').match(/[' '].*/)[0]
  //----------------------------------------------------
  let sqlStr = `
    insert into md_database (
      status,blog_file_name,title,review,data,tags_str,classes_str,type
      ) 
    values(
      '1','${name}','${title}','${review}','${blogdata}','${tags_str}','${classes_str}','${type}'
      )
    on duplicate key update status = '1',
                            title = '${title}',
                            review= '${review}',
                            data = '${blogdata}',
                            tags_str = '${tags_str}',
                            classes_str='${classes_str}'
                            `
  conn.query(sqlStr, (err) => {
    if (err) {
      throw err.message
    }
  })
}

// 开启服务器
app.listen(3300, () => {
  console.log('服务器在3300端口开启。。。。。');
})