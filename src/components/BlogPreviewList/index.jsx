import React, { Component } from 'react'
import Comments from '../Comments'
import './index.css'
import MiniBlogPreview from '../MiniBlogPreview'
export default class BlogListPreview extends Component {
    constructor(props){
        super(props)
    }
    style = {
        'width': '30px',
        'height': '30px',
      }

    com
    render() {
        return (
        <div className = "handle-archive-preivew">
            <h2><svg className='icon' style={{ ...this.style, 'height': '20px' }}>
                <use xlinkHref='#latest-update' />
            </svg>最新文章
            </h2>
            <ul id='handle-archive-preivew'>
            {
            this.props.data.slice(0, 5).map((blog, index) => {
                return <MiniBlogPreview key={blog.title} blog={blog}/>
            })
            }
            </ul> 
        </div>
        )
    }
        
 
    
    }

