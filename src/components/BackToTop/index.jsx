import React, { useEffect } from 'react'
import {BackTop} from 'antd'
import './index.css'

const BackToTop = () => {
  useEffect(() => {
    window.addEventListener('scroll',bindHandleScroll)
        let backtop = document.querySelector('.backtop')
        backtop.onmouseenter=()=>{
          backtop.style.transform=('scale(120%)')
        }
        backtop.onmouseleave=()=>{
          backtop.style.transform=('scale(100%)')
        }          
    return () => {
      window.removeEventListener('scroll',bindHandleScroll)
    }
  }, [])
  
  return (
    <div id="backtop" className="backtop">
    <BackTop visibilityHeight={-100}>
     UP
    </BackTop>
    </div>    
  )
}
const bindHandleScroll=(e)=>{
  const scrollTop =document.documentElement.scrollTop
    const backtop = document.documentElement.querySelector('.backtop')
    if(scrollTop>10){
      backtop.style.transform=('scale(100%)')
    }else{
      backtop.style.transform=('scale(0%)')
    }
}

export default BackToTop