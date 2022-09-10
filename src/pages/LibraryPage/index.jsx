
//packages
import React from 'react'



import { BackTop } from 'antd'

import { useEffect, useState } from 'react'

//components
import HeaderNav from '../../components/HeaderNav'
import BottomNav from '../../components/BottomNav'
import TimeLineMagic from '../../components/TimeLineMagic'
import BACKTOP from '../../components/BackToTop'
import BackToHome from '../../components/BackToHome'
import TagsMagic from '../../components/TagsMagic'
import ClassesMagic from '../../components/ClassesMagic'
//utils
import { yiYan } from '../../utils/getDataFromApi'
import { classesArray, tagsArray,timeLineArray } from '../../utils/SortArray'
//others
import './index.css'
import '../../components/IconUse'
import { setBackGround } from '../../utils/setBackGround'

const LibraryPage = ({ blogdata, custom }) => {
    const [timeLine, setTimeLine] = useState(null)
    const [tagsData, setTagsData] = useState(null)
    const [classesData, setClassesData] = useState(null)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        yiYan('#mingyan')
        setBackGround('#TimeLine .topnav',custom.photo.background.library)
        setTimeLine(timeLineArray(blogdata))
        setTagsData(tagsArray(blogdata))
        setClassesData(classesArray(blogdata))
    }, [blogdata])


    const dataChange = (index) => {
        setIndex(index)
    }
    return (
        <div id='TimeLine'>
            {/* 导航条 */}
            <HeaderNav />
            <div className="timelinebox">
                <div className="topnav">
                    <div className="introuduce">
                        归档
                    </div>
                    <div className="mingyan">
                        <span id="mingyan"></span>
                    </div>
                    <div className="gantlewave">
                        <li className='g1'></li>
                        <li className='g2'></li>
                        <li className='g3'></li>
                        <li className='g4'></li>
                    </div>
                </div>
                <div className="middlebox">
                    <div className="library">
                        {index === 0 ? <TimeLineMagic data={timeLine} /> : null}
                        {index === 1 ? <TagsMagic data={tagsData} /> : null}
                        {index === 2 ? <ClassesMagic data={classesData} /> : null}
                    </div>
                    <div className="changebox">
                        <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => dataChange(0)}>时间轴</div>
                        </BackTop >
                        <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => dataChange(1)}>标签库</div>
                        </BackTop>
                        <BackTop visibilityHeight={-100}>
                            <div className="buttom" onClick={() => dataChange(2)}>分类库</div>
                        </BackTop>
                    </div>
                </div>
                <BottomNav />
                <BackToHome />
                <BACKTOP />
            </div>
        </div>
    )
}

export default LibraryPage