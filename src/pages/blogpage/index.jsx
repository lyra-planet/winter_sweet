import React, { Component } from 'react'
import HeaderNav from '../../components/HeaderNav'
import Comments from '../../components/Comments'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
import '../../components/IconUse'

import './index.css'
export default class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  componentDidMount() {
    const { title,review, data } = this.props
    let blogcontent = document.getElementById(`blogpage${title}`)
    blogcontent.innerHTML = data.replace(review, '')
  }


  tipping = () => {
    let tippingTriangleDown = document.getElementById('tipping-triangle-down')
    let tippinglist = document.getElementById('tippinglist')
    let comments = document.getElementById('comments')
    if (!this.state.index) {
      tippinglist.style.height = '710px'
      comments.style.height = '0'
      tippingTriangleDown.style.transform = ('rotate(180deg)')
      this.setState({ index: 1 })
    } else {
      this.setState({ index: 0 })
      tippinglist.style.height = '0px'
      comments.style.height = '720px'
      tippingTriangleDown.style.transform = ('rotate(0deg)')
    }


  }


  render() {
    const {title,create_time,update_time,type} = this.props
    return (
      <div className='blogpage'>
        {/* <HeaderNav  style={{'display':'none'}}/> */}
        <div className="blogpagebox">
          {/* left */}
          <div className="left">
            {/* 相关信息 */}
            <div className="leftcontent">
              <div className="title">{title}</div>

              <div className='type'>{type}</div>
              <div className="date">{create_time}</div>
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
            <div className="readtime">
              <span id={`/blogpage/lyra${encodeURI(title)}`} className="leancloud_visitors" data-flag-title={title}>
                <em className="post-meta-item-text">
                  <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
                    <use xlinkHref='#love' />
                  </svg>
                  阅读量
                </em>
                <i className="leancloud-visitors-count">0</i>
              </span>
              <div className="time">
                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
                  <use xlinkHref='#calander' />
                </svg>
                {create_time}--
                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
                  <use xlinkHref='#calander' />
                </svg>
                {update_time}
              </div>
            </div>
            {/* 评论 */}
            <div id='comments' className='comments'>              
            <Comments el={title}/>
            </div>
            {/* 打赏 */}
            <div id='tipping' className="tipping" onClick={this.tipping}>
              <span>
                如果觉得不错可以打赏Lyra,当然,觉得不怎么样也可以打赏Lyra
                <svg id='tipping-icon' className='icon' style={{ 'width': '30px', 'height': '20px','transform': 'translateY(5px)translateX(-4px)' }}>
                  <use xlinkHref='#tipping' />
                </svg>
              </span>
              <ul id="tippinglist" className="tippinglist">
                <div className="wechat-pay-box">
                  <li id='wechat-pay'></li>
                  <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'fill': '#04BE02'}}>
                    <use xlinkHref='#wechat-pay' />
                  </svg>
                </div>
                
                <div className="ali-pay-box">
                  <li id='ali-pay' ></li>
                  <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'transform':'translateY(-6px)', 'fill': '#1678ff'}}>
                    <use xlinkHref='#ali-pay' />
                  </svg>
                </div>
               
                <div className="qq-pay">
                  <li id='qq-pay'></li>
                  <svg className='icon' style={{ 'width': '33px', 'height': '33px', 'fill': 'rgb(41, 200, 255)'}}>
                    <use xlinkHref='#qq' />
                  </svg>
                </div>
              
              </ul>
              
              <div className="triangle-down" >
                <svg id='tipping-triangle-down' className='icon' style={{ 'width': '22px', 'height': '22px', 'fill': 'golden', 'transform': 'translateY(5px)translateX(-4px)' }} >
                  <use xlinkHref='#triangle-down' />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <BackToHome />
        <BACKTOP/> 
      </div>
    )
  }
}
