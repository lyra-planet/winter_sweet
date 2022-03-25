import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Anchor } from 'antd';
import BlogPageRouter from './BlogPageRouter';
import BlogPage from '../pages/HomePage'
import IntroductionPage from '../pages/IntroductionPage'
import Blogpage from '../pages/blogpage'
import api from '../api'


export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: /<p>[\s\S]*?<\/p>/,
      block_length: 0,
      blogdata: [],
      blogpattern: [],
      index: 0,
      stateupdate: false,
      initialize:true,
      PosY:0
    }
  }
  componentDidMount() {
    this.BlogInitialize()

  }

  //初始化数据
  BlogInitialize = () => {
    api.Initialize().then(res => {
      let block_length = res.data.block_length
      this.setState({ block_length })
      let blogdata = this.BlogDataHandle(res.data)
      this.setState({ blogdata })
      this.setState({ blogupdate: true })
    }).catch(err => { console.log(err) })
  }
  //更新接收到的数据
  BlockUpdate = (index) => {
    this.setState({ blogupdate: false })
    api.BlockUpdate(index).then(res => {
      let blogdataNew = this.BlogDataHandle(res.data)
      let blodataBefore = this.state.blogdata.slice(0)
      let blogdata = blodataBefore.concat(blogdataNew)
      console.log(blogdata)
      this.setState({ blogdata })
      this.setState({ blogupdate: true })
    }).catch(err => { console.log(err) })
  }
  handleInitialize=(index)=>{
    this.setState({initialize:false})
  }
  handleIndex = (index) => {
    this.setState({ blogupdate: false })
    this.setState({ index: index })
    this.setState({ blogupdate: true })
  }
  // 处理接收到的blogdata
  BlogDataHandle = (dataArr) => {
    let blogdata = dataArr.block_data.map(data => {
      let patterned = data.blog_file.match(this.state.pattern)[0]
      let patternedArray = patterned.replace('<p>', '').replace('</p>', '').split(/[\s:]/g)
      let title = patternedArray[3]
      let time = patternedArray[7]
      let type = patternedArray[13]
      return {
        title,
        create_time: data.createtime.slice(0, 10),
        update_time: data.updatetime.slice(0, 10),
        type,
        review: data.blog_file.replace(patterned, '').replace('<hr>\n\n<hr>', '').match(/[\s\S]*<!-- more -->/),
        data: data.blog_file.replace(patterned, '').replace('<hr>\n\n<hr>', '')
      }
    })
    return blogdata
  }

  handlePosY=(PosY)=>{
    // this.setState({ blogupdate: false })
    this.setState({PosY})
    // this.setState({ blogupdate: true })
  }
  render() {
    return (
      <div>
        <Anchor affix={false} >
          <BrowserRouter>
            <Routes>
              {/* 主页 */}
              <Route path='/' element={this.state.blogupdate ? <BlogPage
                blogdata={this.state.blogdata}
                index={this.state.index}
                initialize={this.state.initialize}
                PosY={this.state.PosY}
                blocklength={this.state.block_length}
                handleIndex={this.handleIndex}
                handleBlock={this.BlockUpdate}
                handleInitialize={this.handleInitialize}
                handlePosY={this.handlePosY}
                /> : null
              } exact></Route>
              {/* 关于我 */}
              <Route path='/introduction' element={<IntroductionPage />}></Route>
              {/* 杂货铺 */}

              {/* 博客页面路由 */}

            {this.state.blogupdate ? <Route path='/*' element={<BlogPageRouter blogdata={this.state.blogdata}/>} /> : null}
            </Routes>
          </BrowserRouter>
        </Anchor>
      </div>


    )
  }
}