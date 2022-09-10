import React from 'react'
import './index.css'
import MiniBlogPreview from './MiniBlogPreview'

const  style = {
    'width': '30px',
    'height': '30px',
}
const BlogListPreview = ({
    blogData,
    custom
}) => {
    return (
        <div className="handle-archive-preivew">
            <h2><svg className='icon' style={{ ...style, 'height': '20px' }}>
                <use xlinkHref='#latest-update' />
            </svg>最新文章
            </h2>
            <ul id='handle-archive-preivew'>
                {   
                    blogData.slice(0, 5).map((blog, index) => {
                        return <MiniBlogPreview key={blog.title} blog={blog} custom={custom} />
                    })
                }
            </ul>
        </div>
    )
}

export default BlogListPreview

