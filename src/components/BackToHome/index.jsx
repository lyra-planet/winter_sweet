import React from 'react'
import  {LeftOutlined} from '@ant-design/icons'
import './index.css'


const BackToHome = () => {
  return (
    <div className="backtohome" onClick={GoBack}>
        <LeftOutlined style={{fontSize:'40px',color:'#fff'}}/>        
    </div>  
)
}
const GoBack=()=>{
  window.history.go(-1)
}
export default BackToHome