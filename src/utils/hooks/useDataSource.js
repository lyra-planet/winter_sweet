import { useEffect } from 'react'
import { useState } from 'react'
const useDataSource = getResourceFunc => {
  const [dataSource,setDataSource] = useState(null)
    useEffect(()=>{
        (async()=>{
            const result = await getResourceFunc()
            const data = createBlogData(result)
            setDataSource(data)
        })()
    },[])
    return dataSource
}
const createBlogData = (item)=>{
    if(item===null){
        return item
    }
    return {
      title:item[0].title,
      data:item[0].title + item[0].review+item[0].data,
      updatetime:item[0].updatetime.slice(0,10),
      createtime:item[0].createtime.slice(0,10)
    }
}
export default useDataSource