import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage'
import IntroductionPage from '../pages/IntroductionPage'
import Grocery from '../pages/GroceryPage'
import LibraryPage from '../pages/LibraryPage'
import BlogPage from '../pages/BlogPage'
import api from '../api'
import { useState } from 'react';
import { useEffect } from 'react';
import {setLocalStorage,removeLocalStorage} from '../utils/LocalStorageFunc'

const defaultCustomData = {
    photo: {
        avatar: null,
        background: {
            homepage: null,
            library: null,
            grocery: null,
            introduction: null,
        },
        pay: {
            qq: null,
            wechat: null,
            zhifubao: null,
        },
        other: {
            comments_little_photo: null,
        }
    },
    link: {
        qq: null,
        wechat: null,
        bilibili: null,
        github: null,
        zhihu: null,
        telegram: null,
        twitter: null,
        netease: null,
        email: null,
        planet: null
    }
}

function Router() {
  const [blogData,setBlogData] =  useState(null)
  const [custom,setCustom] =  useState(null)
  useEffect(()=>{
    (async()=>{
    const initializeData =  await api.Initialize()
    let blogdata = initializeData.data.data.map((data) => {
      let title = data.title
      let create_time = data.createtime.slice(0, 10)
      let update_time = data.updatetime.slice(0, 10)
      let tags = data.tags_str.split(' ').filter((data) => {
        if (data !== ' ') return data
        return []
      })
      let classes = data.classes_str.split(' ').filter((data) => {
        if (data !== ' ') return data
        return []
      })
      return {
        title,
        create_time,
        update_time,
        tags,
        classes
      }
    })
    setBlogData(blogdata)
    setCustom(initializeData.data.custom)
    setLocalStorage('winterSweet--custom',JSON.stringify(initializeData.data.custom))
    })() 
    return()=>{
      removeLocalStorage('winterSweet--custom')
    }
  },[])

      
    return custom&&blogData?( 
      <div>
          <BrowserRouter>
            <Routes>
              {/* 主页 */}
              <Route path='/*' element={<HomePage blogdata={blogData} custom={custom}/>}></Route>
              {/* 图书馆 */}
              <Route path='/library/' element={<LibraryPage blogdata={blogData} custom={custom} />}></Route>
              {/* 杂货铺 */}
              <Route path='/grocery/' element={<Grocery blogData={blogData} custom={custom}/>}></Route>
              {/* 关于我 */}
              <Route path='/introduction/' element={<IntroductionPage blogData={blogData} custom={custom}/>}></Route>
              {/* 博客页面路由 */}
              <Route path='/blogpage/:blogname' element={<BlogPage/>} />              
            </Routes>
          </BrowserRouter>
      </div>
    ):<>Loading</>
  }



export default Router
