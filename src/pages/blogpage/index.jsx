import React, { Component } from 'react'
import Comments from '../../components/Comments'
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
    return (
      <div className='blogpage'>
        <div className="blogpagebox">


          {/* left */}
          <div className="left">
            {/* 相关信息 */}
            <div className="leftcontent">
              <div className="title">{title}</div>

              <div className='type'>{type}</div>
              <div className="date">{time}</div>
            </div>
            {/* 目录*/}

          </div>

          {/* middle */}
          <div className="middle">

            {/* 正文文章 */}
            <div className="content markdown-body" id={`blogpage${title}`}></div>
          </div>

          {/* right */}
          <div className="right">
            {/* 阅读次数 */}
            
            {/* 打赏 */}

            {/* 评论 */}
            <div className='comments'>
            <span id={`/blogpage/${encodeURI(title)}`} className="leancloud_visitors" data-flag-title={title}>
            <em className="post-meta-item-text">阅读量 </em>
            <i className="leancloud-visitors-count">10000</i>
            </span>
            <Comments el={title}/>
            </div>   
          </div>
        </div>
       
        <BackToHome/>
        <BACKTOP />
      </div>
    )
  }
}
