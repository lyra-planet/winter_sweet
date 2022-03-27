import React, { Component } from 'react'
import Typed from 'typed.js'
import { Link } from 'react-router-dom'
import api from '../../api'
import HeaderNav from '../../components/HeaderNav'
import BottomNav from '../../components/BottomNav'
import Comments from '../../components/Comments'
import './index.css'
import '../../components/IconUse'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
export default class TimeLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogdata: [],
            stateupdate: false,
            timeline: []
        }
    }


    componentDidMount() {
        var options = {
            strings: ['盛年不重来，一日难再晨。及时当勉励，岁月不待人。——陶渊明'],
            typeSpeed: 100
        }
        var typed = new Typed('#mingyan', options)
        this.BlogInitialize()

    }
    //初始化数据
    BlogInitialize = () => {
        api.Initialize().then(res => {
            let block_length = res.data.block_length
            this.setState({ block_length })
            let blogdata = res.data.map((data) => {
                let title = data.title
                let create_time = data.createtime.slice(0, 10)
                let update_time = data.updatetime.slice(0, 10)
                let tags = data.tags_str.split(' ').filter((data) => {
                    if (data != ' ') return data
                })
                let classes = data.classes_str.split(' ').filter((data) => {
                    if (data != ' ') return data
                })
                return {
                    title,
                    create_time,
                    update_time,
                    tags,
                    classes
                }
            })
            this.TimeLineMagic(blogdata)
        }).catch(err => { console.log(err) })
    }
    TimeLineMagic = (dataArr) => {
        // 建立一个时间数组
        let timeline = []
        dataArr.forEach((data, index) => {
            let count = 0
            if (index != 0) {
                for (let i = 0; i < timeline.length; i++) {
                    if (data.create_time == timeline[i]) {
                        count++
                    }
                }
            }
            if (count == 0) {
                timeline.push(data.create_time)
            }

        })
        timeline.sort()
        timeline.reverse()
        timeline = timeline.map((data) => {
            return {
                time: data,
                data: []
            }
        })
        dataArr.forEach((data) => {
            for (let i = 0; i < timeline.length; i++) {
                if (data.create_time == timeline[i].time) {
                    timeline[i].data.push(data)
                }
            }
        })
        this.setState({ timeline })
        this.setState({ stateupdate: true })
    }
    render() {

        return (
            <div id='TimeLine'>
                {/* 导航条 */}
 
                <HeaderNav />
                <div className="topnav">
                    <div className="introuduce">
                        时间轴
                    </div>
                    <div className="mingyan">
                        <span id="mingyan">

                        </span>
                    </div>
                </div>

                <div className="middlebox">
                    <div className="timelinecontainer">
                        {
                            this.state.timeline.map((data) => {
                                return <div className='timebox' key={data.time}>
                                    <div className='time'>{data.time}</div>
                                    {
                                        data.data.map((data) => {
                                            return (
                                                <Link to={`/blogpage/lyra${encodeURI(data.title)}`} key={data.title} state={{ title: data.title }}>
                                                    <div className="titlebox">
                                                        <div className="top"><div className="title">{data.title}</div><div className="readtime">
                                                            <div className="readtime">
                                                                <span id={`/blogpage/lyra${encodeURI(data.title)}`} className="leancloud_visitors" data-flag-title={data.title}>
                                                                    <em className="post-meta-item-text"><svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(6px)' }}>
                                                                        <use xlinkHref='#love' />
                                                                    </svg>阅读量 </em>
                                                                    <i className="leancloud-visitors-count">10000</i>
                                                                </span>
                                                            </div>
                                                            {/* 进行评论系统的加载 */}
                                                            <div className="comments-none" style={{ 'display': 'none' }}>
                                                                <Comments el={data.title} />
                                                            </div>
                                                        </div></div>
                                                        <div className="middle">
                                                            <div className='createtime'>
                                                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(3px)' }}>
                                                                    <use xlinkHref='#calander' />
                                                                </svg>&nbsp;{data.create_time}
                                                            </div>--<div className='updatatime'>
                                                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(3px)' }}>
                                                                    <use xlinkHref='#calander' />
                                                                </svg>&nbsp;{data.update_time}</div></div>
                                                        <div className="bottom"><div className="author">
                                                            <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(3px)' }}>
                                                                <use xlinkHref='#user' />
                                                            </svg>&nbsp;Lyra</div> <div className="tags">
                                                                {
                                                                    data.tags.map((data) => {
                                                                        return <div key={data} className="tag">{data}</div>
                                                                    })
                                                                }
                                                            </div></div>
                                                    </div>
                                                </Link>
                                            )


                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
                <BackToHome/>
                <BACKTOP/>
                <BottomNav />
            </div>
        )
    }
}
