import React, { Component } from 'react'
import BlogBox from '../BlogBox'
import api from '../../api'
export default class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pattern: /<p>[\s\S]*?<\/p>/,
            blogdata: [],
            blogpattern: []
        }

    }
    componentDidMount() {
        api.getmdfile().then(res => {
            let blogdata = res.data.map(data => {

                let patterned = data.match(this.state.pattern)[0]
                let patternedArray = patterned.replace('<p>', '').replace('</p>', '').split(/[\s:]/g)
                let title = patternedArray[3]
                let time = patternedArray[7]
                let type = patternedArray[13]
                return {
                    title,
                    time,
                    type,
                    review:data.replace(patterned,'').replace('<hr>\n\n<hr>','').match(/[\s\S]*<!-- more -->/),
                    data:data.replace(patterned,'').replace('<hr>\n\n<hr>','')
                }
            })
            this.setState({ blogdata })
        }).catch(err => { console.log(err) })
    }

    render() {
        return (
            <div className='BlogList'>
        {
            this.state.blogdata.map((blog,index)=>{
                return <BlogBox key={index} index={index}{...blog}/>

            })


        }   
            {/* <BlogRouter {...this.state.blogdata}/> */}
            </div>
        )
    }
}
