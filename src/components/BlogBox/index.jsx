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
        const { title, time } = this.props
        return (
            <div className='blogbox'>
                <Link to={`/blogpage/${encodeURI(title)}`}>
                    <div className="blog">
                        <ul className="textbox">
                            {/* 文章预览 */}
                            <li className='title'>{title}</li>
                            <div className='textfun'>
                                {/* 作者 */}
                                <li className='author'><UserOutlined />&nbsp;Lyra</li>
                                {/* 写作日期 */}
                                <li className='date'><CalendarOutlined />&nbsp;{time}</li>
                                {/* 阅读次数 */}
                                <span id={`/blogpage/${encodeURI(title)}`} className="leancloud_visitors" data-flag-title={title}>
                                    <em className="post-meta-item-text">阅读量 </em>
                                    <i className="leancloud-visitors-count">10000</i>
                                </span>
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
                            <Link to={`/blogpage/${encodeURI(title)}`}>
                                <div className='archivecontent' id={`archievelink${encodeURI(title)}`}>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>


                {/* 进行评论系统的加载 */}
                <div className="comments-none" style={{ 'display': 'none' }}>
                    <Comments/>
                </div>
            </div>
        )
    }
}
