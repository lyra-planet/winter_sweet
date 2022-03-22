import React, { Component } from 'react'
import Valine from 'valine'
import './index.css'
export default class index extends Component {
    componentDidMount(){
        const {el}=this.props
       const Comments = new Valine({
            el:`#${el}`,
            appId:'uC4cbawG7OfwmyWEGxl7RbCv-gzGzoHsz',
            appKey:'UrmcfXEa0xyiRPyimwhgkYp7',
            visitor:true,
            path:`/blogpage/${encodeURI(el)}`
        })
    }
  render() {
    const {el}=this.props

    return (

      <div id={`${el}`}>

      </div>
    )
  }
}
