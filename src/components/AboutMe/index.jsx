import React from 'react'
import './index.css'

import BlogPreviewList from './BlogPreviewList';
import { RotateAvatar } from '../../utils/RotateAvatar';
import { useEffect } from 'react'


const style = {
        'width': '30px',
        'height': '30px',
    }
const followMeStyle = {
        'width': '20px',
        'height': '20px',
    }
const AboutMe = ({
    blogdata,
    custom
}) => {
    useEffect(()=>{
        let tagsdata = []
        let classesdata = []
        let avatar = document.getElementById('AboutMeAvatar')
        avatar.style.backgroundImage = `url(${custom.photo.avatar})`
        blogdata.forEach(blog => {
            blog.tags.forEach((tag) => {                
               tagsdata.push(tag)
            })
        })
        tagsdata = Array.from(new Set(tagsdata))
        blogdata.forEach(blog => {
            blog.classes.forEach((tag) => {
               classesdata.push(tag)
            })
        })
        classesdata = Array.from(new Set(classesdata))

        let data = {
            blogdata:blogdata,
            tagsdata,
            classesdata
        }
        handleData(data)
    },[blogdata])

    // 从BlogList获取数据
    const handleData = (blogListData) => {
        // 设置迷你归档
        const mini_archive_article = document.getElementById('mini-archive-article')
        const mini_archive_type = document.getElementById('mini-archive-type')
        const mini_archive_class = document.getElementById('mini-archive-class')
        mini_archive_article.innerText = blogListData.blogdata.length
        mini_archive_type.innerText = blogListData.tagsdata.length
        mini_archive_class.innerText = blogListData.classesdata.length
    }

    let link = custom.link
    // console.log(custom)
    return (
        <div className='aboutme'>
            {/* 个人简介 */}
            <div className="myself">
                {/* 头像 */}
                <div id='AboutMeAvatar' className="avatar" onClick={() =>RotateAvatar('AboutMeAvatar')}></div>
                <h1>Lyra</h1>
                {/* 个人简介 */}
                <span>来自星空的美少女</span>
                {/* 迷你归档 */}
                <ul className="miniarchive">
                    <li>
                        <span>文章</span>
                        <div id='mini-archive-article'></div>
                    </li>
                    <li>
                        <span>标签</span>
                        <div id='mini-archive-type'></div>
                    </li>
                    <li>
                        <span>分类</span>
                        <div id='mini-archive-class'></div>
                    </li>
                </ul>
                {/* followme */}
                <a href={link.github?`${link.github}`:''} className="followme">
                    <div className="text">
                        <svg className='icon-followme' style={followMeStyle}>
                            <use xlinkHref='#github-white' />
                        </svg>Follow Me
                    </div>
                </a>

                {/* Links */}
                <ul className="links">
                    {/* QQ */}
                    <li><a href={`${link.qq}`}>
                        <svg className='icon' style={{...style, 'fill': '#12B7F5' }}>
                            <use xlinkHref='#qq' />
                        </svg>
                    </a></li>
                    {/* 微信 */}
                    <li><a href={`${link.wechat}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#1AAD19' }}>
                            <use xlinkHref='#wechat' />
                        </svg>
                    </a></li>
                    {/* 哔哩哔哩 */}
                    <li>
                        <a href={`${link.bilibili}`}>
                            <svg className='icon' style={{ ...style, 'fill': '#FF8EB3' }}>
                                <use xlinkHref='#bilibili' />
                            </svg>
                        </a>
                    </li>
                    {/* Github */}
                    <li><a href={link.github&&`${link.github}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#6e5494' }}>
                            <use xlinkHref='#github' />
                        </svg>
                    </a></li>
                    {/* 知乎 */}
                    <li><a href={link.zhihu?`${link.zhihu}`:'#'}>
                        <svg className='icon' style={{ ...style, 'fill': '#0084FF' }}>
                            <use xlinkHref='#zhihu' />
                        </svg>
                    </a></li>
                    {/* Telegram */}
                    <li><a href={`${link.telegram}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#0088CC' }}>
                            <use xlinkHref='#telegram' />
                        </svg>
                    </a></li>
                    {/* Twitter */}
                    <li><a href={`${link.twitter}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#1da1f2' }}>
                            <use xlinkHref='#twitter' />
                        </svg>
                    </a></li>
                    {/* 网易云 */}
                    <li><a href={`${link.netease}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#C20C0C' }}>
                            <use xlinkHref='#netease' />
                        </svg></a></li>
                    {/* 邮箱 */}
                    <li><a href={`${link.email}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#8E71C1' }}>
                            <use xlinkHref='#email' />
                        </svg></a></li>
                    {/* QQ群 小星球 */}
                    <li><a href={`${link.planet}`}>
                        <svg className='icon' style={{ ...style, 'fill': '#6699CC' }}>
                            <use xlinkHref='#planet' />
                        </svg></a></li>
                </ul>
            </div>
            {/* BlogPreview */}
           <BlogPreviewList blogData={blogdata} custom={custom} />
        </div>
    )
}

export default AboutMe

