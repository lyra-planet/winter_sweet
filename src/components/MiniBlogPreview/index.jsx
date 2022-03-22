import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Comments from '../../components/Comments'
export default class index extends Component {
    render() {
        const {blog}=this.props

        return (
            <li>
                <Link to={`/blogpage/${encodeURI(blog.title)}`}>
                    <div className="topbar">
                        <div className='title'>
                            {blog.title}
                        </div>
                        <div className='readtime'>
                            <span id={`/blogpage/${encodeURI(blog.title)}`} className="leancloud_visitors" data-flag-title={blog.title}>
                                <em className="post-meta-item-text">阅读量 </em>
                                <i className="leancloud-visitors-count">10000</i>
                            </span>
                        </div>
                    </div>
                    <h3>{blog.type}</h3>
                    <h2>{blog.time}</h2>
                </Link>
                <div className="comments-none" style={{'display':'none'}}>
                    <Comments/>
                </div>
            </li>

        )
    }
}
