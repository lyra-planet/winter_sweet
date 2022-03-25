import React, { Component } from 'react'
import Valine from 'valine'
import './index.css'
export default class index extends Component {
    componentDidMount(){
        const {el}=this.props
        // el=el.replace(/<[^>]*>|/g,"")
        let ab=el.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
       const Comments = new Valine({
            el:`#lyra${ab.slice(0,6)}`,
            appId:'uC4cbawG7OfwmyWEGxl7RbCv-gzGzoHsz',
            appKey:'UrmcfXEa0xyiRPyimwhgkYp7',
            visitor:true,
            path:`/blogpage/lyra${encodeURI(el)}`
        })
    }
  render() {
    const {el}=this.props
    let ab=el.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
    return (
      <div id={`lyra${ab.slice(0,6)}`}>

      </div>
    )
  }
}
