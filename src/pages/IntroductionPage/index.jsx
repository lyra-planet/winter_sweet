import React, { Component } from 'react'
import HeaderNav from '../../components/HeaderNav'
import AboutMe from '../../components/AboutMe'
import BACKTOP from '../../components/BackTop'
import BackToHome from '../../components/BackToHome'
import BottomNav from '../../components/BottomNav'
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
  }
  render() {

    return (
      <div className='introduction'>
        <HeaderNav />
        <div className="middle">
          <div className="left">
            <div className="introducteme">
            
            </div>
              <div className="comment" id='introduction'></div>
          </div>
          <div className="right">
            <AboutMe blogdata={this.props.blogdata} />
          </div>
        </div>

        <BACKTOP />
        <BackToHome />
        <BottomNav />
      </div>
    )
  }
}

