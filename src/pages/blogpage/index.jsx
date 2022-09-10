import React, { useState, useEffect } from 'react'
import api from '../../api'
import Comments from '../../components/Comments'
import BackToHome from '../../components/BackToHome'
import '../../components/IconUse'
import './index.css'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import BackToTop from '../../components/BackToTop'
import TocHelper from 'toc-helper'
import { getLocalStorage } from '../../utils/LocalStorageFunc'
import { setBackGround } from '../../utils/setBackGround'
const BlogPage = () => {
  const [index, setIndex] = useState(0)
  const [blogData, setBlogData] = useState({})
  const ref = useRef()
  const params = useParams()
  const custom = JSON.parse(getLocalStorage('winterSweet--custom'))

  const LoadBlogFile = (title) => {
    api.BlogFileLoad(title).then(res => {
      let blogdata = createBlogData(res.data[0])
      document.querySelector('.content').innerHTML = blogdata.data
      new TocHelper(document.querySelector('.blogpage'), {
        contentSelector: document.querySelector('.content'),
        collapsedLevel: 2,
      })
      setBlogData(blogdata)
    })
  }
  const Tipping = () => {
    let tippingTriangleDown = document.getElementById('tipping-triangle-down')
    let tippinglist = document.getElementById('tippinglist')
    let comments = document.getElementById('comments')
    if (!index) {
      tippinglist.style.height = '710px'
      comments.style.height = '0'
      tippingTriangleDown.style.transform = ('rotate(180deg)')
      setIndex(1)
    } else {
      setIndex(0)
      tippinglist.style.height = '0px'
      comments.style.height = '720px'
      tippingTriangleDown.style.transform = ('rotate(0deg)')
    }
  }
  const createBlogData = (item) => {
    return {
      title: item.title,
      data: item.title + item.review + item.data,
      updatetime: item.updatetime.slice(0, 10),
      createtime: item.createtime.slice(0, 10)
    }
  }
  useEffect(() => {
    LoadBlogFile(params.blogname)
    setBackGround('#qq-pay1',  custom.photo.pay.qq)
    setBackGround('#wechat-pay1', custom.photo.pay.wechat)
    setBackGround('#ali-pay1', custom.photo.pay.zhifubao)
  }, [])
  return (
    <div className='blogpage'>
      <div className="blogpagebox">
        {/* left */}
        <div className="left">
          {/* 目录*/}
          <div className='toc' ref={ref} />
        </div>
        {/* middle */}
        <div className="middle">
          {/* 正文文章 */}
          <div className="content markdown-body" id={`blogpage${blogData.title}`} >
          </div>

        </div>
        {/* right */}
        <div className="right">
          {/* 阅读次数 */}
          <div className="readtime">
            <span id={`/blogpage/lyra${encodeURI(blogData.title)}`} className="leancloud_visitors" data-flag-title={blogData.title}>
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
              {blogData.createtime}--
              <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
                <use xlinkHref='#calander' />
              </svg>
              {blogData.updatetime}
            </div>
          </div>
          {/* 评论 */}
          <div id='comments' className='comments'>
            {blogData ? <Comments el={params.blogname} /> : <>loading</>}
          </div>
          {/* 打赏 */}
          <div id='tipping' className="tipping" onClick={Tipping}>
            <span>
              如果觉得不错可以打赏Lyra,当然,觉得不怎么样也可以打赏Lyra
              <svg id='tipping-icon' className='icon' style={{ 'width': '30px', 'height': '20px', 'transform': 'translateY(5px)translateX(-4px)' }}>
                <use xlinkHref='#tipping' />
              </svg>
            </span>
            <ul id="tippinglist" className="tippinglist">
              <div className="wechat-pay">
                <li id='wechat-pay1'>


                </li>
                <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'fill': '#04BE02' }}>
                  <use xlinkHref='#wechat-pay' />
                </svg>
              </div>

              <div className="ali-pay">
                <li id='ali-pay1'>


                </li>
                <svg className='icon' style={{ 'width': '34px', 'height': '34px', 'transform': 'translateY(-6px)', 'fill': '#1678ff' }}>
                  <use xlinkHref='#ali-pay' />
                </svg>
              </div>

              <div className="qq-pay">
                <li id='qq-pay1'></li>
                <svg className='icon' style={{ 'width': '33px', 'height': '33px', 'fill': 'rgb(41, 200, 255)' }}>
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
      <BackToTop />
    </div>
  )
}




export default BlogPage




//useEffect


