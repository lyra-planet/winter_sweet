import React, { Component } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Anchor } from 'antd';
// import App from '../pages/App'
// import SignUpPage from '../pages/SignUp/SignUpPage'
// import SignInPage from '../pages/SignIn/SignInPage'
import BlogPage from '../pages/HomePage'
import IntroductionPage from '../pages/IntroductionPage'
import Blogpage from '../pages/blogpage'
import api from '../api'


export default class index extends Component {
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
      <div>
        <Anchor  affix={false} >
        <BrowserRouter>
          <Routes>
              {/* 主页 */}
            <Route path='/' element={<BlogPage/>} exact></Route>
            {/* 关于我 */}
            <Route path='/introduction' element={<IntroductionPage/>}></Route>           
            {/* 杂货铺 */}
            
            {/* 博客页面路由 */}
            {
            this.state.blogdata.map((blog,index)=>{              
              return <Route key={index} path={`/blogpage/${encodeURI(blog.title)}`} element={<Blogpage {...blog}/>}/>
            })
            }         
          </Routes>         
        </BrowserRouter>
        </Anchor>
        
         
        
      </div>
        
       
    )
  }
}