import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from 'antd';
import Typed from 'typed.js'

import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import './index.css'
import '../../components/IconUse'

import HeaderNav from '../../components/HeaderNav'
import BotttomNav from '../../components/BottomNav'
import api from '../../api'
import BACKTOP from '../../components/BackTop'
import BlogList from '../../components/BlogList'
import BlogPreviewList from '../../components/BlogPreviewList'


export default class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      bloglist: {},
      length: '',
      // BlogListCopy
      pattern: /<p>[\s\S]*?<\/p>/,
      blogdata: [],
      blogpattern: [],
      blogdatadeliver: false
      /////////////
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
    //从服务器获取数据并处理分发数据
    api.getmdfile().then(res => {
      let blogdata = res.data.map(data => {
        let patterned = data.match(this.state.pattern)[0]
        let patternedArray = patterned.replace('<p>', '').replace('</p>', '').split(/[\s:]/g)
        let title = patternedArray[3]
        let time = patternedArray[7]
        let type = patternedArray[13]
        return {
          title,
          time,
          type,
          review: data.replace(patterned, '').replace('<hr>\n\n<hr>', '').match(/[\s\S]*<!-- more -->/),
          data: data.replace(patterned, '').replace('<hr>\n\n<hr>', '')
        }
      })
      let typedata = []
      blogdata.forEach(blog => {
        if (typedata.length == 0) {
          typedata.push(blog.type)
        } else {
          let count = 0
          for (let i = 0; i < typedata.length; i++) {
            if (typedata[i] != blog.type) {
              count++
            }
          }
          if (count == typedata.length) {
            typedata.push(blog.type)
          }
        }
      })
      let data = {
        fulldata: blogdata,
        typedata: typedata,
      }
      this.setState({ blogdata })
      this.setState({ blogdatadeliver: true })
      this.handleData(data)
    }).catch(err => { console.log(err) })
    //////////////
  }



  // 从BlogList获取数据
  handleData = (bloglistdata) => {
    this.setState({ bloglist: bloglistdata })
    // 设置迷你归档
    const mini_archive_article = document.getElementById('mini-archive-article')
    const mini_archive_type = document.getElementById('mini-archive-type')
    const mini_archive_class = document.getElementById('mini-archive-class')
    mini_archive_article.innerText = bloglistdata.fulldata.length
    mini_archive_type.innerText = bloglistdata.typedata.length
    mini_archive_class.innerText = bloglistdata.typedata.length
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
  Rotate2 = (i = 0) => {
    if (this.state.index == 1) {
      let avatar = document.querySelectorAll('.avatar')
      setTimeout(() => {

        avatar[i].style.animation = ('myfirst 1s  ease')


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
            {this.state.blogdatadeliver ? <BlogList handleData={this.state.blogdata} /> : null}
          </div>
          {/* 杂项 */}
          <div className="right">
            {/* 个人简介 */}
            <div className="myself">
              {/* 头像 */}
              <div className="avatar" onClick={() => this.Rotate2(1)}></div>
              <h1>Lyra</h1>
              {/* 个人简介 */}
              <span>来自星空的美少女</span>
              {/* 迷你归档 */}
              <ul className="miniarchive">
                <li>
                  <span>文章</span>
                  <div id='mini-archive-article'>{this.state.bloglist.length}</div>
                </li>
                <li>
                  <span>标签</span>
                  <div id='mini-archive-type'></div>
                </li>
                <li>
                  <span>分类</span>
                  <div id='mini-archive-class'>3</div>
                </li>
              </ul>
              {/* followme */}
              <a href="#" className="followme">
                <div className="text">
                  <svg className='icon-followme' style={this.followMeStyle}>
                    <use xlinkHref='#github-white' />
                  </svg>Follow Me
                </div>
              </a>

              {/* Links */}
              <ul className="links">
                {/* QQ */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#12B7F5' }}>
                    <use xlinkHref='#qq' />
                  </svg>
                </a></li>
                {/* 微信 */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#1AAD19' }}>
                    <use xlinkHref='#wechat' />
                  </svg>
                </a></li>
                {/* 哔哩哔哩 */}
                <li>
                  <a href="#">
                    <svg className='icon' style={{ ...this.style, 'fill': '#FF8EB3' }}>
                      <use xlinkHref='#bilibili' />
                    </svg>
                  </a>
                </li>
                {/* Github */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#6e5494' }}>
                    <use xlinkHref='#github' />
                  </svg>
                </a></li>
                {/* 知乎 */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#0084FF' }}>
                    <use xlinkHref='#zhihu' />
                  </svg>
                </a></li>
                {/* Telegram */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#0088CC' }}>
                    <use xlinkHref='#telegram' />
                  </svg>
                </a></li>
                {/* Twitter */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#1da1f2' }}>
                    <use xlinkHref='#twitter' />
                  </svg>
                </a></li>
                {/* 网易云 */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#C20C0C' }}>
                    <use xlinkHref='#netease' />
                  </svg></a></li>
                {/* 邮箱 */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#8E71C1' }}>
                    <use xlinkHref='#email' />
                  </svg></a></li>
                {/* QQ群 小星球 */}
                <li><a href="#">
                  <svg className='icon' style={{ ...this.style, 'fill': '#6699CC' }}>
                    <use xlinkHref='#planet' />
                  </svg></a></li>
              </ul>

            </div>
            {/* BlogPreview */}
            {this.state.blogdatadeliver ? <BlogPreviewList data={this.state.blogdata} /> : null}
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

