import React, { Component } from 'react'
import Valine from 'valine'
import './index.css'
export default class index extends Component {
    componentDidMount(){
        const {el}=this.props
        let ab=el.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
       const Comments = new Valine({
            el:`#lyra${ab.slice(0,6)}`,
            appId:,
            appKey:,
            visitor:true,
            path:`/blogpage/lyra${encodeURI(el)}`
       })}
      render(){
      const {el}=this.props
      let ab=el.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
    return (
      <div id={`lyra${ab.slice(0,6)}`}>
      </div>
    )
  }
}
