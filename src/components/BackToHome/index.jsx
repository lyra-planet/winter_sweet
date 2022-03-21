import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  {LeftOutlined} from '@ant-design/icons'
import './index.css'
export default class BackToHome extends Component {
  render() {
    return (
        
          <div className="backtohome">
              <Link to={'/'}>
              <LeftOutlined style={{fontSize:'40px',color:'#fff'}}/>
              </Link>             
              </div>  


    )
  }
}
