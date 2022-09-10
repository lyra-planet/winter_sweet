import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Toggle from 'react-toggle'
import DarkModeToggle from '../DarkModeToggle'
import './index.css'
const HeaderNav = () => {
    useEffect(() => {
        window.addEventListener('scroll',headerNavChange)
    
      return () => {
        window.removeEventListener('scroll',headerNavChange)
      }
    }, [])
return (
    <div id='headernav' className='headernav'>
        <div className="title">Lyra的秘密基地</div>
        <ul className="linkcontainer">
            {/* 主页 */}
            <li><DarkModeToggle/></li>
            <li><Link className='link' to='/'>主页</Link></li>
            <li><Link className='link' to='/library/'>归档</Link></li>
            <li><Link className='link' to='/grocery/'>杂货铺</Link></li>
            <li><a className='travel-link' href="https://travellings.link/">友链</a></li>
            <li><Link className='link' to='/introduction/'>Lyra的小秘密</Link></li>
        </ul>

    </div>
)
}
const headerNavChange=()=>{
    let scrollTop = document.documentElement.scrollTop
    let headernav = document.getElementById('headernav')
    if(scrollTop!==0){
        headernav.classList.add('active')
    }else{
        headernav.classList.remove('active')
    }
}
export default HeaderNav
