import React, { Component } from 'react'
import './index.css'
export default class iBottomNav extends Component {
  constructor(props){
    super(props)
    this.state={
      runningTime:{}
    }

  }
  componentDidMount(){
   this.timecount=setInterval(()=>{
      this.gettime()
    },1000)
      
  }

  gettime = ()=>{
    let startTime = {
      y:2021,
      m:3,
      d:20,
      hh:17,
      mm:39,
      ss:0
    }
    let date = new Date()
    let y = date.getFullYear()-startTime.y
    let m = date.getMonth()-startTime.m
    let d = (date.getDay()-startTime.d)
    let hh = date.getHours()-startTime.hh
    let mm = date.getMinutes()-startTime.mm
    let ss = date.getSeconds()-startTime.ss
    let runningTime={
      y,
      m,
      d,
      hh,
      mm,
      ss
    }

    this.setState({runningTime})
  }
  componentWillUnmount(){
    clearInterval(this.timecount)
  }

  render() {
    const {y,m,d,hh,mm,ss} = this.state.runningTime
    return (
      <div className='bottomnav'>
          <div className="bottomnavtop">
          <div className="time">2022-2022</div>&nbsp;&nbsp;&nbsp;
          <div className="author">Lyra</div>
          </div>
          <div className="bottomnavmiddle">
          <div className="react">Powered by<span>React</span></div>|
          <div className="theme">WinterSweet</div>
          </div>

          <div className="bottomnavmiddle">
              秘密基地已经秘密存在了{y}年{m}月{d}天{hh}小时{mm}分{ss}秒
          </div>

          
          
      </div>
    )
  }
}
