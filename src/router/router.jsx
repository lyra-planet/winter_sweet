import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Anchor } from 'antd';
import KeepAlive from 'react-activation'

import BlogPage from '../pages/HomePage'
import IntroductionPage from '../pages/IntroductionPage'
import Grocery from '../pages/GroceryPage'
import TimeLine from '../pages/TimeLine'
import Library from '../pages/Library'

import Blogpage from '../pages/blogpage'

import api from '../api'


export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogdata: [],
      stateupdate: false,
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
      let blogdata = res.data.map((data) => {
        let title = data.title
        let create_time = data.createtime.slice(0, 10)
        let update_time = data.updatetime.slice(0, 10)
        let tags = data.tags_str.split(' ').filter((data) => {
          if (data != ' ') return data
        })
        let classes = data.classes_str.split(' ').filter((data) => {
          if (data != ' ') return data
        })
        return {
          title,
          create_time,
          update_time,
          tags,
          classes
        }
      })
      this.setState({ blogdata })
      this.setState({ stateupdate: true })
    }).catch(err => { console.log(err) })
  }
  render() {
    return (
      <div>
        <Anchor affix={false} >
          <BrowserRouter>
            <Routes>
              {/* 主页 */}
              <Route path='/*' element={this.state.stateupdate ? 
              
              <BlogPage blogdata={this.state.blogdata}/> 
              : null
              } exact></Route>
              
              {/* 时间轴 */}
              <Route path='/timeline/' element={<TimeLine blogdata={this.state.blogdata}/>}></Route>
              {/* 图书馆 */}
              <Route path='/library/' element={<Library blogdata={this.state.blogdata} />}></Route>
              {/* 杂货铺 */}
              <Route path='/grocery/' element={<Grocery blogdata={this.state.blogdata}/>}></Route>
              {/* 关于我 */}
              <Route path='/introduction/' element={<IntroductionPage/>}></Route>
              
              
              {/* 博客页面路由 */}
              <Route path='/blogpage/:blogname' element={<Blogpage/>} />
            </Routes>
          </BrowserRouter>
        </Anchor>
      </div>


    )
  }
}