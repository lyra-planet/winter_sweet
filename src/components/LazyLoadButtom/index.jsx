import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './index.css'
const LazyLoadButtom = (
    {blockLength,
    index,
    handleIndex,
    handleBlockUpdate
}) => {
    const [haveMoreBlogBox,setHaveMoreBlogBox] = useState(true)
    const loadMore = () => {
        if (index < blockLength-1) {
            index++
            handleIndex(index)
            handleBlockUpdate(index)
        }
    }
    useEffect(()=>{
        if(index===blockLength-1){
            setHaveMoreBlogBox(false)
        }
    },[index])
  return (
    <div id='loadmore' onClick={loadMore}>
            {haveMoreBlogBox?<>还想看更多(≧▽≦*)</>:<>没有了捏(≧▽≦*)</>}    
            </div>
  )
}

export default LazyLoadButtom
