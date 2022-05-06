import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from 'antd';
import Typed from 'typed.js'
import KeepAlive from 'react-activation'
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import './index.css'
import '../../components/IconUse'
import HeaderNav from '../../components/HeaderNav'
import BotttomNav from '../../components/BottomNav'
import api from '../../api'
import BACKTOP from '../../components/BackTop'
import BlogList from '../../components/BlogList'
import BlogPreviewList from '../../components/BlogPreviewList'
import LazyLoad from '../../components/LazyLoad'
import AboutMe from '../../components/AboutMe'
export default class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 1
    }
  }
  style = {
    'width': '30px',
    'height': '30px',
  }
  followMeStyle = {
    'width': '20px',
    'height': '20px',
  }


  componentDidMount() {
    api.yiyan().then(res => {
      var options = {
        strings: [res.data.text],
        typeSpeed: 50
      }
      var typed = new Typed('#yiyan', options)
    })
    let custom = this.props.custom
    let avatar = document.querySelectorAll('.avatar')
    avatar[1].style.backgroundImage = `url(${custom.photo.avatar})`
    
    let backgroundImage = document.querySelectorAll('.HomePage>.topwrap')
    backgroundImage[0].style.backgroundImage = `url(${custom.photo.background.homepage})`
}

  //头像点击转动样式
  Rotate = (i = 0) => {
    if (this.state.index == 1) {
      let avatar = document.querySelectorAll('.avatar')
      setTimeout(() => {
        avatar[i].style.animation = ('myfirst2 1s  ease')

      }, 1)
      avatar[i].style.animation = ('none')
    }
  }
  render() {
    const { Link } = Anchor
    return (
      <div className='HomePage'>
        <HeaderNav />
        {/* 顶部容器 */}
        <div className="topwrap">
          <div className="name">
            <div className='avatar' onClick={() => this.Rotate(0)}></div>
            <span>Lyra的秘密基地</span>
            <div className="yiyan">
              <span id='yiyan'></span>
            </div>
          </div>
          <div className='topbottom'>
            <div className="down">
              <Link href="#blogcontainer" title={<DownOutlined style={{ 'fontSize': '30px', 'fontWeight': '900', 'color': '#fff' }} />}></Link>
            </div>

          </div>
        </div>
        <div className="middlepage">
          {/*博客表单  */}
          <div id='blogcontainer' className="blogcontainer">
            <KeepAlive>
              <BlogList custom={this.props.custom} />
            </KeepAlive>
          </div>
          {/* 杂项 */}
          <div className="right">
            <AboutMe blogdata={this.props.blogdata} custom={this.props.custom}/>
          </div>
        </div>
        {/* 底部容器 */}
        <div className="bottomwrapper">
          <BotttomNav />
          <BACKTOP />
        </div>
      </div>
    )
  }
}

