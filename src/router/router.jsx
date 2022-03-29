import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Anchor } from 'antd';
import KeepAlive from 'react-activation'
import BlogPage from '../pages/HomePage'
import IntroductionPage from '../pages/IntroductionPage'
import Grocery from '../pages/GroceryPage'
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
              <Route path='/*' element={this.state.stateupdate ?<BlogPage blogdata={this.state.blogdata}/> 
              : null
              } exact></Route>
              {/* 图书馆 */}
              <Route path='/library/' element={ this.state.stateupdate ?<Library blogdata={this.state.blogdata} />:null}></Route>
              {/* 杂货铺 */}
              <Route path='/grocery/' element={this.state.stateupdate ?<Grocery blogdata={this.state.blogdata}/>:null}></Route>
              {/* 关于我 */}
              <Route path='/introduction/' element={this.state.stateupdate ?<IntroductionPage blogdata={this.state.blogdata}/>:null}></Route>
              {/* 博客页面路由 */}
              <Route path='/blogpage/:blogname' element={<Blogpage/>} />
            </Routes>
          </BrowserRouter>
        </Anchor>
      </div>


    )
  }
}