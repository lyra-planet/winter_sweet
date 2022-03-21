import React, { Component } from 'react'
import { Row, Col } from 'antd';

import HeaderNav from '../../components/HeaderNav'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
import './index.css'
export default class BlogPage extends Component {
  componentDidMount() {
    const { title, time, type, review, data } = this.props
    let blogcontent = document.getElementById(`blogpage${title}`)
    blogcontent.innerHTML = data.replace(review, '')
  }
  render() {
    const { title, time, type, review, data } = this.props
    console.log(title)
    return (
      <div className='blogpage'>

        <div className="blogpagebox">
          {/* left */}

          <div className="left">
            {/* 目录*/}

          </div>

          {/* middle */}

          <div className="middle">

            {/* 正文文章 */}
            <div className="content markdown-body" id={`blogpage${title}`}></div>
          </div>

          {/* right */}

          <div className="right">
            {/* 相关信息 */}
            <div className="rightcontent">
              <div className="title">{title}</div>
              
              <div className='type'>{type}</div>
              <div className="date">{time}</div>
            </div>

            {/* 阅读次数 */}

            {/* 打赏 */}

            {/* 评论 */}

          </div>
        </div>

        <BackToHome />
        <BACKTOP />
      </div>
    )
  }
}
