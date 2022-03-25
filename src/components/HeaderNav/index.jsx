import { Link } from 'react-router-dom'
import './index.css'
import React, { Component } from 'react'
export default class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            time:''
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.headerNavChange)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.headerNavChange)
    }
    headerNavChange=()=>{
        let scrollTop = document.documentElement.scrollTop
        let headernav = document.getElementById('headernav')
        if(scrollTop!=0){
            headernav.classList.add('active')
        }else{
            headernav.classList.remove('active')
        }
    }
    render() {
        return (
            <div id='headernav' className='headernav'>
                <div className="title">Lyra的秘密基地</div>
                <ul className="linkcontainer">
                    {/* 主页 */}
                    <li><Link className='link' to='/'>主页</Link></li>
                    <li><Link className='link' to='/grocerypage'>图书角</Link></li>
                    <li><Link className='link' to='/grocerypage'>杂货铺</Link></li>
                    <li><a className='travel-link' href="https://travellings.link/">友链</a></li>
                    <li><Link className='link' to='/introduction'>Lyra的小秘密</Link></li>
                </ul>

            </div>
        )
    }
}
