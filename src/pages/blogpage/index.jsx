import React, { Component, useState } from 'react'
import TocHelper from 'toc-helper'
import api from '../../api'
import HeaderNav from '../../components/HeaderNav'
import Comments from '../../components/Comments'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
import '../../components/IconUse'
import './index.css'
import { useLocation} from 'react-router-dom'
import { createBrowserHistory, createMemoryHistory } from 'history'

function myWithRouter(BlogPage) {
  let save={}
  return (props) => {
    let location = useLocation()
    const params = {
      state:location.state
    }
    if(params.state!=null){
      save=params
    }
    return <BlogPage {...props} params={save}/>
  }
} 



class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      blogdata:{},
      stateupdate:false
    }
    this.ref=null
  }

  componentDidMount() {
    const scrollTop = document.documentElement.scrollTop
    let custom=this.props.params.state.custom
    let qqPay = document.getElementById('qq-pay1')
    qqPay.style.backgroundImage = `url(${custom.photo.pay.qq})`
    let cPay = document.getElementById('wechat-pay1')
    cPay.style.backgroundImage = `url(${custom.photo.pay.wechat})`
    let aliPay = document.getElementById('ali-pay1')
    aliPay.style.backgroundImage = `url(${custom.photo.pay.zhifubao})`
    
    this.LoadBlogFile(this.props.params.state.title)
}

  LoadBlogFile=(title)=>{
    api.BlogFileLoad(title).then(res=>{
      const {title} = this.props.params.state
      let blogcontent = document.getElementById(`blogpage${title}`)
      this.setState(({stateupdate:false}))
      let blogdata={
        title:res.data[0].title,
        updatetime:res.data[0].updatetime.slice(0,10),
        createtime:res.data[0].createtime.slice(0,10)
      }
      this.setState({blogdata})
      this.setState(({stateupdate:true}))
      blogcontent.innerHTML = res.data[0].data
      let a =new TocHelper(this.ref,{
        contentSelector:document.querySelector('.content'),
        collapsedLevel:2,
      })
    })
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
    const {blogdata,stateupdate}=this.state
    const {createtime,updatetime,title}=blogdata
    return (
      <div className='blogpage'>
        <div className="blogpagebox">
          {/* left */}
          <div className="left">
            {/* 目录*/}
            <div className='toc' ref={ref => this.ref = ref} ></div>
          </div>
          {/* middle */}
          <div className="middle">
            {/* 正文文章 */}
            <div className="content markdown-body" id={`blogpage${this.props.params.state.title}`}></div>
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
                {createtime}--
                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
                  <use xlinkHref='#calander' />
                </svg>
                { updatetime}
              </div>
            </div>
            {/* 评论 */}
            <div id='comments' className='comments'>
              {stateupdate?<Comments el={this.props.params.state.title}/>:null }              
            
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
                <div className="wechat-pay">
                  <li id='wechat-pay1'>


                  </li>
                  <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'fill': '#04BE02'}}>
                    <use xlinkHref='#wechat-pay' />
                  </svg>
                </div>
                
                <div className="ali-pay">
                  <li id='ali-pay1'>


                  </li>
                  <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'transform':'translateY(-6px)', 'fill': '#1678ff'}}>
                    <use xlinkHref='#ali-pay' />
                  </svg>
                </div>
               
                <div className="qq-pay">
                  <li id='qq-pay1'></li>
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

export default myWithRouter(BlogPage)