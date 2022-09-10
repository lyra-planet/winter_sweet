//packages
import React from 'react'
import { useEffect } from 'react'
//components
import HeaderNav from '../../components/HeaderNav'
import AboutMe from '../../components/AboutMe'
import BACKTOP from '../../components/BackToTop'
import BackToHome from '../../components/BackToHome'
import BottomNav from '../../components/BottomNav'
//utils
import { setBackGround } from '../../utils/setBackGround'
//others
import './index.css'
import api from '../../api'

const GroceryPage = ({
  blogData,
  custom
}) => {
  useEffect(()=>{
    setBackGround('#grocery-page-wrapper',custom.photo.background.introduction)
    getIntroduction()
  },[])
  return (
    <div className='introduction' id='grocery-page-wrapper'>
      <HeaderNav />
      <div className="middle">
        <div className="left">
          <div id="grocery" className='content markdown-body'>
          </div>
            <div className="comment" id='introduction'></div>
        </div>
        <div className="right">
          <AboutMe blogdata={blogData} custom={custom} />
        </div>
      </div>
      <BottomNav />
      <BACKTOP />
      <BackToHome />
    </div>
  )
}

export default GroceryPage
const getIntroduction =()=>{
  api.Grocery().then(res=>{
    let introducteme = document.getElementById('grocery')
    introducteme.innerHTML=res.data.data[0].data
  })
}
