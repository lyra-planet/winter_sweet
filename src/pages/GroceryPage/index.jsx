import React, { Component } from 'react'
import HeaderNav from '../../components/HeaderNav'
import AboutMe from '../../components/AboutMe'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
import BottomNav from '../../components/BottomNav'

import api from '../../api'

import Valine from 'valine'
import './index.css'
export default class IntroductionPage extends Component {
  componentDidMount() {
    const Comments = new Valine({
      el: `#introduction`,
      appId: 'uC4cbawG7OfwmyWEGxl7RbCv-gzGzoHsz',
      appKey: 'UrmcfXEa0xyiRPyimwhgkYp7',
      visitor: true,
      path: `/introduction/`
    }
    )
    let custom = this.props.custom
    let backgroundImage = document.querySelectorAll('.introduction')
    backgroundImage[0].style.backgroundImage = `url(${custom.photo.background.introduction})`
    this.getIntroduction()
  }

  getIntroduction(){
    api.Grocery().then(res=>{
      console.log(res.data.data[0].data)
      let introducteme = document.getElementById('grocery')
      introducteme.innerHTML=res.data.data[0].data
    })
  }
  render() {

    return (
      <div className='introduction'>
        <HeaderNav />
        <div className="middle">
          <div className="left">
            <div id="grocery" className='content markdown-body'>
            </div>
              <div className="comment" id='introduction'></div>
          </div>
          <div className="right">
            <AboutMe blogdata={this.props.blogdata} custom={this.props.custom} />
          </div>
        </div>
        <BottomNav />
        <BACKTOP />
        <BackToHome />
      </div>
    )
  }
}
