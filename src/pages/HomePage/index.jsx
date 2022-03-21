import React, { Component } from 'react'
import { Anchor } from 'antd';
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import HeaderNav from '../../components/HeaderNav'
import BotttomNav from '../../components/BottomNav'
import api from '../../api'
import BACKTOP from '../../components/BackTop'
import BlogList from '../../components/BlogList'
import './index.css'
export default class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 1
    }
  }

  componentDidMount() {
    api.yiyan().then(res => {
      let yiyan = document.getElementById('yiyan')
      yiyan.innerText = res.data.text
    })

  }




  //头像点击转动样式
  Rotate = () => {
    if (this.state.index == 1) {
      let avatar = document.querySelector('.avatar')
      setTimeout(() => {
        avatar.style.animation = ('myfirst2 1s  ease')
      }, 1)
      avatar.style.animation = ('none')
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
            <div className='avatar' onClick={this.Rotate}></div>
            <span>Lyra的秘密基地</span>
            <div id="yiyan"></div>
          </div>
          <div className='topbottom'>
            <div className="down">
              <Link href="#blogcontainer" title={<DownOutlined style={{ 'font-size': '30px', 'font-weight': '900', 'color': '#fff' }} />}>

              </Link>
            </div>

          </div>
        </div>
        <div className="middlepage">
          {/*博客表单  */}
          <div id='blogcontainer' className="blogcontainer">
            <BlogList />
          </div>


          {/* 杂项 */}
          <div className="right">
            {/* 个人简介 */}
            <div className="myself">
              {/* 头像 */}
              <div className="avatar">

              </div>
              {/* 个人简介 */}
              <span></span>
              {/* 迷你归档 */}
              <ul className="miniarchive">
                <li id='mini-archive-article'>
                  <span>文章</span>
                  <span>12</span>
                </li>
                <li id='mini-archive-type'>
                  <span>标签</span>
                  <span>3</span>
                </li>
                <li id='mini-archive-class'>
                  <span>分类</span>
                  <span>3</span>
                </li>
              </ul>
              {/* followme */}
              <a href="#" className="followme">
                <GithubOutlined />Follow Me
              </a>
              {/* Links */}
              <ul className="links">
                {/* QQ */}
                <li><a href="#"></a></li>
                {/* 微信 */}
                <li><a href="#"></a></li>
                {/* 哔哩哔哩 */}
                <li><a href="#"><svg>
                  <use xlink:href=''></use>
                  </svg></a></li>
                {/* Github */}
                <li><a href="#"></a></li>
                {/* 知乎 */}
                <li><a href="#"></a></li>
                {/* Tg */}
                <li><a href="#"></a></li>
                {/* Twitter */}
                <li><a href="#"></a></li>
                {/* 网易云 */}
                <li><a href="#"></a></li>
                {/* 邮箱 */}
                <li><a href="#"></a></li>
                {/* QQ群 小星球 */}
                <li><a href="#"></a></li>
              </ul>
            </div>
            {/* 归档预览 */}
          </div>
        </div>

        {/* 底部容器 */}
        <div className="bottomwrapper">
          <BotttomNav />
        </div>
        <BACKTOP />
      </div >

    )
  }
}

