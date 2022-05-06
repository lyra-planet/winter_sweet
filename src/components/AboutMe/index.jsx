import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Anchor } from 'antd'
import Typed from 'typed.js'
import KeepAlive from 'react-activation'
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import './index.css'
import controller from '../../controller'
import BlogPreviewList from '../BlogPreviewList';
export default class BlogPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            bloglist: {},
            blogdata: [],
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
        let blogdata = this.props.blogdata
        let tagsdata = []
        let classesdata = []
        
        let custom =this.props.custom
        //设置头像背景图
        let avatar = document.querySelectorAll('.avatar')
        avatar[0].style.backgroundImage = `url(${custom.photo.avatar})`
        
        // 计算tag的数量
        let count = 0
        blogdata.forEach(blog => {
            blog.tags.forEach((tag) => {
                if (tagsdata.length == 0) {
                    tagsdata.push(tag)
                } else {
                    for (let i = 0; i < tagsdata.length; i++) {
                        if (tagsdata[i] != tag) {
                            count++
                        }
                    }
                    if (count == tagsdata.length) {
                        tagsdata.push(tag)
                    }
                }
            })
        })
        // 计算class的数量
        count = 0
        blogdata.forEach(blog => {
            blog.classes.forEach((tag) => {
                if (classesdata.length == 0) {
                    classesdata.push(tag)
                } else {
                    for (let i = 0; i < classesdata.length; i++) {
                        if (classesdata[i] != tag) {
                            count++
                        }
                    }
                    if (count == classesdata.length) {
                        classesdata.push(tag)
                    }
                }
            })
        })
        let data = {
            fulldata: blogdata,
            tagsdata,
            classesdata
        }
        this.setState({ blogdata })
        this.handleData(data)
    }

    handleIndex = (index) => {
        this.props.handleIndex(index)
    }

    handleBlock = (index) => {
        this.props.handleBlock(index)
    }
    // 从BlogList获取数据
    handleData = (bloglistdata) => {
        this.setState({ bloglist: bloglistdata })
        // 设置迷你归档
        const mini_archive_article = document.getElementById('mini-archive-article')
        const mini_archive_type = document.getElementById('mini-archive-type')
        const mini_archive_class = document.getElementById('mini-archive-class')
        mini_archive_article.innerText = bloglistdata.fulldata.length
        mini_archive_type.innerText = bloglistdata.tagsdata.length
        mini_archive_class.innerText = bloglistdata.classesdata.length
    }
    //头像点击转动样式
    Rotate2 = (i = 0) => {
        if (this.state.index == 1) {
            let avatar = document.querySelectorAll('.avatar2')
            setTimeout(() => {
                avatar[0].style.animation = ('myfirst 1s  ease')
            }, 1)
            avatar[0].style.animation = ('none')
        }
    }
    render() {
        let custom = this.props.custom
        let link = custom.link
        return (
            <div className='aboutme'>
                {/* 个人简介 */}
                <div className="myself">
                    {/* 头像 */}
                    <div className="avatar avatar2" onClick={() => this.Rotate2(1)}></div>
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
                    <a href={`${link.github}`} className="followme">
                        <div className="text">
                            <svg className='icon-followme' style={this.followMeStyle}>
                                <use xlinkHref='#github-white' />
                            </svg>Follow Me
                        </div>
                    </a>

                    {/* Links */}
                    <ul className="links">
                        {/* QQ */}
                        <li><a href={`${link.qq}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#12B7F5' }}>
                                <use xlinkHref='#qq' />
                            </svg>
                        </a></li>
                        {/* 微信 */}
                        <li><a href={`${link.wechat}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#1AAD19' }}>
                                <use xlinkHref='#wechat' />
                            </svg>
                        </a></li>
                        {/* 哔哩哔哩 */}
                        <li>
                            <a href={`${link.bilibili}`}>
                                <svg className='icon' style={{ ...this.style, 'fill': '#FF8EB3' }}>
                                    <use xlinkHref='#bilibili' />
                                </svg>
                            </a>
                        </li>
                        {/* Github */}
                        <li><a href={`${link.github}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#6e5494' }}>
                                <use xlinkHref='#github' />
                            </svg>
                        </a></li>
                        {/* 知乎 */}
                        <li><a href={`${link.zhihu}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#0084FF' }}>
                                <use xlinkHref='#zhihu' />
                            </svg>
                        </a></li>
                        {/* Telegram */}
                        <li><a href={`${link.telegram}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#0088CC' }}>
                                <use xlinkHref='#telegram' />
                            </svg>
                        </a></li>
                        {/* Twitter */}
                        <li><a href={`${link.twitter}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#1da1f2' }}>
                                <use xlinkHref='#twitter' />
                            </svg>
                        </a></li>
                        {/* 网易云 */}
                        <li><a href={`${link.netease}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#C20C0C' }}>
                                <use xlinkHref='#netease' />
                            </svg></a></li>
                        {/* 邮箱 */}
                        <li><a href={`${link.email}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#8E71C1' }}>
                                <use xlinkHref='#email' />
                            </svg></a></li>
                        {/* QQ群 小星球 */}
                        <li><a href={`${link.planet}`}>
                            <svg className='icon' style={{ ...this.style, 'fill': '#6699CC' }}>
                                <use xlinkHref='#planet' />
                            </svg></a></li>
                    </ul>
                </div>
                {/* BlogPreview */}
               <BlogPreviewList data={this.props.blogdata} />
            </div>
        )
    }
}
