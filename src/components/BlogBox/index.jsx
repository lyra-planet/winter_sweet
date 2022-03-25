import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comments from '../Comments'
import { UserOutlined, CalendarOutlined, HeartOutlined, FolderOutlined } from '@ant-design/icons'
import './index.css'
import '../IconUse'

export default class BlogBox extends Component {
    componentDidMount() {
        const { title, review, type } = this.props
        document.getElementById(`${title}`).innerHTML = (review)
        document.getElementById(`archievelink${encodeURI(title)}`).innerText = (type)
    }
    render() {
        const { title, update_time,create_time } = this.props
        return (
            <div className='blogbox'>
                <Link to={{
                    pathname:`/blogpage/lyra${encodeURI(title)}`
                }} style={{'width':'100%'}}>
                    <div className="blog">
                        <ul className="textbox">
                            {/* 文章预览 */}
                            <li className='title'>{title}</li>
                            <div className='textfun'>
                                {/* 作者 */}
                                <div className='author'>
                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)' }}>
                                    <use xlinkHref='#user' />
                                </svg>&nbsp;Lyra</div>
                                {/* 写作日期 */}
                                <div className='date'> 
                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)' }}>
                                    <use xlinkHref='#calander' />
                                </svg>&nbsp;{create_time}--
                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)'}}>
                                    <use xlinkHref='#calander' />
                                </svg>&nbsp;{update_time}
                                </div>
                                {/* 阅读次数 */}
                                <div className="readtime">
                                <span id={`/blogpage/lyra${encodeURI(title)}`} className="leancloud_visitors" data-flag-title={title}>
                                    <em className="post-meta-item-text"><svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateY(6px)'}}>
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

                    <div className="archivelinkboxbox">
                        <svg className='icon-type' style={this.followMeStyle}>
                            <use xlinkHref='#type' />
                        </svg>
                        <div className="archivelinkbox">
                            <Link to={`/blogpage/lyra${encodeURI(title)}`}>
                                <div className='archivecontent' id={`archievelink${encodeURI(title)}`}>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>


                {/* 进行评论系统的加载 */}
                <div className="comments-none" style={{ 'display': 'none' }}>
                    {/* <Comments el={title}/> */}
                </div>
            </div>
        )
    }
}
