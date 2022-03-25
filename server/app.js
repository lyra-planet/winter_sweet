const express = require('express') //引入express 模块
const config = require('config') //加载config模块
const logger = require('morgan') //加载日志模块
const app = express() //创建实例
const mysql = require('mysql')
const router = express.Router()

//引入文件读写模块
const fs = require('fs')
//引入处理post模块
const bodypaser = require('body-parser')
//引入md文件处理模块
const marked = require('marked')
//引入跨域解决模块
const cors = require('cors')
//引入mysql 模块


app.use(logger("dev")) //调用日志,配置为dev模式
//使用请求的模块
app.use(bodypaser.urlencoded({
  extended: false
}))
app.use(bodypaser.json())
app.use(cors()) //解决跨域问题



//打印默认信息 development | proudction
const title = config.get('title')
console.log(title)
const host = config.get('db.host')
console.log(host)

// 创建数据库连接 填入数据库信息 
const conn = mysql.createConnection({
  user: 'root', //用户名
  password: 'ck781208', //密码
  host: 'localhost', //主机
  database: 'blog_md_database', //数据库名
  charset: 'UTF8MB4'
})
// 测试连接
conn.connect(err => {
  console.log(err, '如果为null 就是连接成功');
})

readFile('./source/post')

app.post('/api/getmdFile', (req, res) => {
  let MYSQL_STR = 'select * from md_database'
  conn.query(MYSQL_STR, (err, data) => {
    if (err) throw err
    let length=BlogListLazy(BlogListReverse(data)).block_length
    let data2=BlogListLazy(BlogListReverse(data)).block_data
    console.log(req.body)
    res.send({block_data:data2[req.body.index],block_length:length})
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
BlogListLazy=(data_str)=>{
  const DataBefore = data_str
  let length = DataBefore.length
  const DataAfter=[]
  // 五个为一组 获取组数
  let block_length = parseInt(length/5)
  //获取余数
  const block_left=length%5
  if(block_left!=0){
    block_length++
  }
  for(let i =0;i<block_length;i++){
    const Block = DataBefore.slice(0+i*5,5+i*5)
    DataAfter.push(Block) 
  }
  return {
    block_length:block_length,
    block_data:DataAfter
    
  }
}
// Mysql监听BLog文件的改变并修改
function readFile(filepath) {
  let dataAfter
  fs.readdir('./source/post', (err, files) => {
    files.forEach(data => {
      fs.readFile(`./source/post/${data}`, (err, data2) => {
        if (err) console.log(err)
        let data3 = marked.parse(data2.toString('utf-8'))
        let sqlStr = `
          insert into md_database (blog_name,blog_file) 
          values('${data}','${data3}')
          on duplicate key update blog_file = '${data3}'`
        conn.query(sqlStr, (err) => {
          if (err) {
            throw err.message
          }
        })
      })

    })

  })
}


// 开启服务器
app.listen(3300, () => {
  console.log('服务器在3300端口开启。。。。。');
})