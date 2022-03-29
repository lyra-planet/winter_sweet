import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comments from '../../components/Comments'
export default class ClassesMagic extends Component {
  render() {
    return (
        <div className="linecontainer">
            <div className="count">分类库/目前总计{this.props.data.length}个分类</div>
        {
            this.props.data.map((data,index) => {
                return <div className='box' key={index}>
                    <div className='data'>{data.class}</div>
                    {
                        data.data.map((data) => {
                            return (
                                <Link to={`/blogpage/lyra${encodeURI(data.title)}`} key={data.title} state={{ title: data.title }}>
                                    <div className="titlebox">
                                        <div className="top"><div className="title">{data.title}</div><div className="readtime">
                                            <div className="readtime">
                                                <span id={`/blogpage/lyra${encodeURI(data.title)}`} className="leancloud_visitors" data-flag-title={data.title}>
                                                    <em className="post-meta-item-text"><svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)', 'transform': 'translateY(5px)' }}>
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
                                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(9px) translateY(4px)'  }}>
                                                    <use xlinkHref='#calander' />
                                                </svg>&nbsp;{data.create_time}
                                            </div>--<div className='updatatime'>
                                                <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(9px) translateY(4px)'  }}>
                                                    <use xlinkHref='#calander' />
                                                </svg>&nbsp;{data.update_time}</div></div>
                                        <div className="bottom"><div className="author">
                                            <svg className='icon' style={{ 'width': '20px', 'height': '20px', 'fill': 'var(--Deep)','transform':'translateX(9px) translateY(4px)' }}>
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
    )
  }
}
