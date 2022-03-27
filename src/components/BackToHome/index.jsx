import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  {LeftOutlined} from '@ant-design/icons'
import './index.css'
export default class BackToHome extends Component {

  GoBack=()=>{
    window.history.go(-1)
  }
  render() {
    return (
        
          <div className="backtohome" onClick={this.GoBack}>
              <LeftOutlined style={{fontSize:'40px',color:'#fff'}}/>        
              </div>  


    )
  }
}
