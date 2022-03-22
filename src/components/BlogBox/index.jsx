import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                                <li className='readnum'><HeartOutlined />&nbsp;阅读次数:1</li>
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
            </div>
        )
    }
}
