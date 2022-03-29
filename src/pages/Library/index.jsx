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
import { BackTop } from 'antd'
import TimeLineMagic from '../../components/TimeLineMagic'
import TagsMagic from '../../components/TagsMagic'
import ClassesMagic from '../../components/ClassesMagic'


export default class TimeLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogdata: [],
            stateupdate: false,
            timeline: [],
            tagsdata: [],
            classesdata: [],
            index: 0
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
        let blogdata =this.props.blogdata
            this.setState({blogdata})
            this.TimeLineMagic(blogdata)
            this.TagsMagic(blogdata)
            this.ClassesMagic(blogdata)
            this.setState({ stateupdate: true })
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

    }
    TagsMagic = (blogdata) => {
        // 计算tag的数量
        let tagsdata = []
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
        tagsdata = tagsdata.map((data) => {
            return {
                tag: data,
                data: []
            }
        })
        blogdata.forEach((data) => {
            let bdata = data
            data.tags.forEach((data) => {
                for (let i = 0; i < tagsdata.length; i++) {
                    if (data == tagsdata[i].tag) {
                        tagsdata[i].data.push(bdata)
                    }
                }
            })

        })
        this.setState({ tagsdata })
    }

    ClassesMagic = (blogdata) => {
        // 计算class的数量
        let classesdata = []
        let count = 0
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
        classesdata = classesdata.map((data) => {
            return {
                class: data,
                data: []
            }
        })
        blogdata.forEach((data) => {
            let bdata = data
            data.classes.forEach((data) => {
                for (let i = 0; i < classesdata.length; i++) {
                    if (data == classesdata[i].class) {
                        classesdata[i].data.push(bdata)
                    }
                }
            })

        })
        this.setState({ classesdata })
    }
    dataChange = (index) => {
        this.setState({ index: index })
    }

    render() {
        return (

            <div id='TimeLine'>
                {/* 导航条 */}
                <HeaderNav />
                <div className="timelinebox">
                    <div className="topnav">
                        <div className="introuduce">
                            图书角
                        </div>
                        <div className="mingyan">
                            <span id="mingyan"></span>
                        </div>
                        <div className="gantlewave">
                            <li className='g1'></li>
                            <li className='g2'></li>
                            <li className='g3'></li>
                            <li className='g4'></li>
                        </div>
                    </div>


                    <div className="middlebox">
                        <div className="library">
                            {this.state.stateupdate && this.state.index == 0 ? <TimeLineMagic data={this.state.timeline} /> : null}
                            {this.state.stateupdate && this.state.index == 1 ? <TagsMagic data={this.state.tagsdata} /> : null}
                            {this.state.stateupdate && this.state.index == 2 ? <ClassesMagic data={this.state.classesdata} /> : null}

                        </div>
                        <div className="changebox">
                            <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => this.dataChange(0)}>时间轴</div>
                            </BackTop >
                            <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => this.dataChange(1)}>标签库</div>
                            </BackTop>
                            <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => this.dataChange(2)}>分类库</div>
                            </BackTop>
                           
                            
                            
                        </div>
                    </div>
                    <BackToHome />
                    <BACKTOP />
                    <BottomNav />
                </div>

            </div>
        )
    }
}
