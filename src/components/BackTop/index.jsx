import React, { Component } from 'react'
import {BackTop} from 'antd'
import './index.css'
export default class BACKTOP extends Component {

  componentDidMount(){
        window.addEventListener('scroll',this.bindHandleScroll)
        let backtop = document.querySelector('.backtop')
        backtop.onmouseenter=()=>{
          backtop.style.transform=('scale(120%)')
        }
        backtop.onmouseleave=()=>{
          backtop.style.transform=('scale(100%)')
        }          
      }
      componentWillUnmount(){
        window.removeEventListener('scroll',this.bindHandleScroll)
    }
    bindHandleScroll=(e)=>{
        const scrollTop =document.documentElement.scrollTop
        const backtop = document.documentElement.querySelector('.backtop')
        if(scrollTop>10){
          backtop.style.transform=('scale(100%)')
        }else{
          backtop.style.transform=('scale(0%)')
        }
      }
    render() {
    return (
      <div id="backtop" className="backtop">
      <BackTop visibilityHeight={-100}>
       UP
      </BackTop>
      </div>

       
    )
  }
}
