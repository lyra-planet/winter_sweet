import React, { Component } from 'react'
import Router from './router/router.js'
import './App.css'
export default class App extends Component {
    styles = {
        scroll:{
            '::webkitScrollbar':{
                width:'10px',
                height:'2px'
            }
        }
    }
    handleScroll(e){
        // let scroll = this.styles.scroll['&::webkit-scrollbar'].width
        // if(scroll==='0px'){
        //     this.styles.scroll['&::webkit-scrollbar'].width='10px'
        // }
    }
    
  render() {
    return (
      <div className='wholecontainer' style={this.styles.scroll} onWheel={(e)=>this.handleScroll(e)}>
          <Router/>
      </div>
    )
  }
}
