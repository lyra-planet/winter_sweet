import React from 'react'
import { Link } from 'react-router-dom'

import Comments from '../../../Comments'


import './index.css'



const BlogPreviewListItem = ({
    blog,
    custom
}) => {
    return (
        <li className='miniblogpreview'>
            <Link to={`/blogpage/${encodeURI(blog.title)}`}>
                <div className="topbar">
                    <div className='title'>
                        {blog.title}
                    </div>
                    <div className='readtime'>
                        <span id={`/blogpage/lyra${encodeURI(blog.title)}`} className="leancloud_visitors" data-flag-title={blog.title}>
                            <em className="post-meta-item-text">阅读量 </em>
                            <i className="leancloud-visitors-count">10000</i>
                        </span>
                    </div>
                </div>
                <h2>{blog.create_time}--{blog.update_time}</h2>
                <h3>{blog.tags[0]}</h3>
                
            </Link>
            <div className="comments-none" style={{'display':'none'}}>
                <Comments el={blog.title}/>
            </div>
        </li>

    )
}

export default BlogPreviewListItem

