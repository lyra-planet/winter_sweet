import React, { Component } from 'react'
import './index.css'


export default class LazyLoad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }
    componentDidMount() {
        const loadmore = document.getElementById('loadmore')
        let blocklength = this.props.blocklength
        let index = this.props.index
        loadmore.addEventListener('click', () => {
            if (index < blocklength-1) {
                index++
                this.props.handleIndex(index)
                this.props.handleBlock(index)
            }
            if(index==blocklength-1){
                let loadmore = document.getElementById('loadmore')
                loadmore.innerText=('没有了捏( *￣▽￣)')
            }
        })

    }


    render() {
        return (
            <div id='loadmore'>
                还想看更多(≧▽≦*)
            </div>
        )
    }
}
