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
        let typedata=[]
        blogdata.forEach(blog => {
            if(typedata.length==0){
                typedata.push(blog.type)
            }else{
                let count=0
                for(let i = 0;i<typedata.length;i++){
                    if(typedata[i]!=blog.type){
                        count++
                    }
                }
                if(count==typedata.length){
                    typedata.push(blog.type)
                }
            }
        })
            // 返回给HomePage的数据
            let data={
                typedata:typedata,
                length:blogdata.length
            }
            this.props.handleData(data)
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
