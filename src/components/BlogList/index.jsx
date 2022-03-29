import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BlogBox from '../BlogBox'
import api from '../../api'
import Comments from '../Comments'
import LazyLoad from '../LazyLoad';


import './index.css'
export default class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pattern: /[\s\S]*<!-- more -->/,
            block_length: 0,
            blogdata: [],
            blogpattern: [],
            index: 0,
            stateupdate: false,
            initialize: true
        }
    }
    componentDidMount() {
        this.BlockUpdate()
    }

    //更新接收到的数据
    BlockUpdate = (index=0) => {
        this.setState({ blogupdate: false })
        api.BlockUpdate(index).then(res => {
            let blogdata=res.data.block_data.map((data)=>{
                let title = data.title
                let review = data.review
                let create_time = data.createtime.slice(0, 10)
                let update_time = data.updatetime.slice(0, 10)
                let tags = data.tags_str.split(' ').filter((data)=>{
                  if(data!=' ') return data
                })
                let classes = data.classes_str.split(' ').filter((data)=>{
                  if(data!=' ') return data
                })
                return {
                  title,
                  review,
                  create_time,
                  update_time,
                  tags,
                  classes
                }
              })
            let blogdataNew = blogdata
            let blodataBefore = this.state.blogdata.slice(0)
            blogdata = blodataBefore.concat(blogdataNew)
            this.setState({block_length:res.data.block_length})
            this.setState({ blogdata })
            this.setState({ stateupdate: true })
        }).catch(err => { console.log(err) })
    }
    handleIndex = (index) => {
        this.setState({ blogupdate: false })
        this.setState({ index })
        this.setState({ blogupdate: true })
    }
    render() {
        return (
            <div className='BlogList'>
                {
                    this.state.blogdata.map((blog, index) => {
                        return <BlogBox key={index} index={index} {...blog} />
                    })
                }
                {this.state.stateupdate ? <LazyLoad blocklength={this.state.block_length} index={this.state.index} handleIndex={this.handleIndex} handleBlock={this.BlockUpdate} /> : null}
            </div>
        )
    }
}
