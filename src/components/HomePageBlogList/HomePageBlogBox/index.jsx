import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FolderOutlined } from '@ant-design/icons'
import Comments from '../../Comments'

import './index.css'
import '../../IconUse'

const HomePageBlogBox = ({
  custom,
  index,
  blog
}) => {
  const { title,review,update_time,create_time,tags } = blog
  useEffect(()=>{
    document.getElementById(`${title}`).innerHTML = (review)
  },[])
  return (
    <div className='blogbox'>
        <Link to={`/blogpage/${encodeURI(title)}/`} state={{title:title,custom:custom}} style={{ 'width': '100%' }}>
            <div className="blog">
                <ul className="textbox">
                    {/* 文章预览 */}
                    <li className='title'>{title}</li>
                    <div className='textfun'>
                        {/* 作者 */}
                        <div className='author'>
                            <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(7px) translateY(0px)' }}>
                                <use xlinkHref='#user' />
                            </svg>&nbsp;Lyra</div>
                        {/* 写作日期 */}
                        <div className='date'>
                            <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(7px) translateY(-2px)'}}>
                                <use xlinkHref='#calander' />
                            </svg>&nbsp;{create_time}--
                            <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(7px) translateY(-2px)' }}>
                                <use xlinkHref='#calander' />
                            </svg>&nbsp;{update_time}
                        </div>
                        {/* 阅读次数 */}
                        <div className="readtime">
                            <span id={`/blogpage/lyra${encodeURI(title)}`} className="leancloud_visitors" data-flag-title={title}>
                                <em className="post-meta-item-text"><svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(6px)' }}>
                                    <use xlinkHref='#love' />
                                </svg>阅读量 </em>
                                <i className="leancloud-visitors-count">10000</i>
                            </span>
                        </div>

                    </div>
                    {/* 文章内容 */}
                    <li className='content' id={title}></li>
                </ul>
            </div>
        </Link>
        {/* 归档 */}
        <div className='archive'>
            <div className="archivebox">
                <FolderOutlined />
            </div>
        <div className="leftbox">
        {
                tags.map((tag) => {
                    return (
                        <div key={tag} className="archivelinkboxbox">
                        <svg className='icon-type' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(-1px) translateX(6px)' }}>
                            <use xlinkHref='#type' />
                        </svg>
                        <div  className="archivelinkbox">
                            <Link to={`/tags/lyra${encodeURI(tag)}`}>
                                <div className='archivecontent'>
                                    {tag}
                                </div>
                            </Link>
                        </div>
                    </div>
                        )

                })
            }
        </div>
        </div>
        {/* 进行评论系统的加载 */}
        <div className="comments-none" style={{ 'display': 'none' }}>
            {/* <Comments el={title}/> */}
        </div>
    </div>
)
}

export default HomePageBlogBox



