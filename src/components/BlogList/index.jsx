import React, { Component } from 'react'
import BlogBox from '../BlogBox'
import api from '../../api'
import Comments from '../Comments'
export default class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pattern: /<p>[\s\S]*?<\/p>/,
            blogdata: [],
            blogpattern: []
        }
    }
    render() {
        return (
            <div className='BlogList'>
        {
            this.props.handleData.map((blog,index)=>{
                return <BlogBox key={index} index={index}{...blog}/>
            })
        }   
            
        </div>
        )
    }
}
