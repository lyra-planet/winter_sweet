
// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import BlogBox from './BlogBox'
// import api from '../../api'
// import Comments from '../Comments'
// import LazyLoad from '../LazyLoad'
//packages
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
//components
// import HomePage
import api from '../../api'
import HomePageBlogBox from './HomePageBlogBox'
import LazyLoadButtom from '../LazyLoadButtom'
//others
import './index.css'
const HomePageBlogList = ({custom}) => {
  const [blockLength,setBlockLength] = useState(0)
  const [blogData,setBlogData] = useState([])
  const [index,setIndex] = useState(0)
  const BlockUpdate = (index=0) => {
          api.BlockUpdate(index).then(res => {
              let newBlogData=res.data.block_data.map((data)=>{
                  let title = data.title
                  let review = data.review
                  let create_time = data.createtime.slice(0, 10)
                  let update_time = data.updatetime.slice(0, 10)
                  let tags = data.tags_str.split(' ').filter((data)=>{
                    if(data!==' ') return data
                    else return  ''
                  })
                  let classes = data.classes_str.split(' ').filter((data)=>{
                    if(data!==' ') return data
                    else return ''
                  })
                  return {
                    title,
                    review,
                    create_time,
                    update_time,
                    tags,
                    classes
                  }
                })
              let previewBlogData = blogData
              
              setBlockLength(res.data.block_length)
              setBlogData(previewBlogData.concat(newBlogData))
          }).catch(err => { console.log(err) })
      }
  useEffect(()=>{BlockUpdate(index)},[index])
  const handleIndex = (index) => {
        setIndex(index)
    }
  return (
                  <div className='BlogList'>
                      {
                          blogData && blogData.map((blog,index) => {
                             
                            return <HomePageBlogBox key={blog.title+index} custom={custom} index={index} blog={{...blog}} />
                          })
                      }
                      <LazyLoadButtom blockLength={blockLength} index={index} handleIndex={handleIndex} handleBlockUpdate={BlockUpdate} />
                  </div>
  )
}

export default HomePageBlogList
