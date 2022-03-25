import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BlogPageRouter from '../../router/BlogPageRouter';

import BlogBox from '../BlogBox'
import api from '../../api'
import Comments from '../Comments'
import LazyLoad from '../LazyLoad';
export default class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pattern: /<p>[\s\S]*?<\/p>/,
            block_length: 3,
            blogdata: [],
            blogpattern: [],
            index: 0,
            stateupdate: true,
            initialize:true
        }
    }
    componentDidMount() {
        this.BlogInitialize()
    }
    //初始化数据
    BlogInitialize = () => {
        this.setState({ blogupdate: false })
        api.Initialize().then(res => {
            let block_length = res.data.block_length
            this.setState({ block_length })
            let blogdata = this.BlogDataHandle(res.data)
            this.setState({ blogdata })
            this.setState({ blogupdate: true })
        }).catch(err => { console.log(err) })
    }
    //更新接收到的数据
    BlockUpdate = (index) => {
        this.setState({ blogupdate: false })
        api.BlockUpdate(index).then(res => {
            let blogdataNew = this.BlogDataHandle(res.data)
            let blodataBefore = this.state.blogdata.slice(0)
            let blogdata = blodataBefore.concat(blogdataNew)
            this.setState({ blogdata })
            this.setState({ blogupdate: true })
        }).catch(err => { console.log(err) })
    }

    handleIndex = (index) => {
        this.setState({ blogupdate: false })
        this.setState({ index })
        this.setState({ blogupdate: true })
    }
    // 处理接收到的blogdata
    BlogDataHandle = (dataArr) => {
        let blogdata = dataArr.block_data.map(data => {
            let patterned = data.blog_file.match(this.state.pattern)[0]
            let patternedArray = patterned.replace('<p>', '').replace('</p>', '').split(/[\s:]/g)
            let title = patternedArray[3]
            let time = patternedArray[7]
            let type = patternedArray[13]
            return {
                title,
                create_time: data.createtime.slice(0, 10),
                update_time: data.updatetime.slice(0, 10),
                type,
                review: data.blog_file.replace(patterned, '').replace('<hr>\n\n<hr>', '').match(/[\s\S]*<!-- more -->/),
                data: data.blog_file.replace(patterned, '').replace('<hr>\n\n<hr>', '')
            }
        })
        return blogdata
    }
    render() {
        return (
            <div className='BlogList'>
                {
                    // this.props.handleData.map((blog, index) => {
                    //     return <BlogBox key={index} index={index} {...blog} />
                    // })
                    this.state.blogdata.map((blog, index) => {
                        return <BlogBox key={index} index={index} {...blog} />
                    })
                }
                {this.state.stateupdate ? <LazyLoad blocklength={this.state.block_length} index={this.state.index} handleIndex={this.handleIndex} handleBlock={this.BlockUpdate} /> : null}
                {/* <Routes>
                {this.state.stateupdate ? <Route path='*'element={<BlogPageRouter blogdata={this.state.blogdata}/>} /> : null}
                </Routes> */}
               
                {/* {this.state.stateupdate ?<BlogPageRouter blogdata={this.state.blogdata} />: null} */}
            </div>
        )
    }
}
