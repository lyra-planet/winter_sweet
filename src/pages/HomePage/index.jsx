//packages
import { useEffect} from 'react';
import Typed from 'typed.js'

//components
import HeaderNav from '../../components/HeaderNav'
import BotttomNav from '../../components/BottomNav'
import api from '@/api'
import BackToTop from '../../components/BackToTop'
import HomePageBlogList from '../../components/HomePageBlogList'
import AboutMe from '../../components/AboutMe'
import SplitScreen from '../../components/SplitScreen'
import {RotateAvatar} from '../../utils/RotateAvatar'
import SortItemByName from '../../components/SortItemByName';
import { DownOutlined } from '@ant-design/icons';
import { Anchor } from 'antd';
import DarkModeToggle from '../../components/DarkModeToggle';
//utils
import {ThreeSortArray} from '../../utils/SortArray'
import { yiYan } from '../../utils/getDataFromApi';
import { setBackGround } from '../../utils/setBackGround';
//others
import './index.css'
import '../../components/IconUse'
import styled from 'styled-components';
const  {Link} = Anchor
const ThemeTransForm=styled.div`
 
`;
const HomepPageWrapper = styled(ThemeTransForm)`

`;

const HomePage = ({blogdata ,custom}) => {
  useEffect(()=>{
    setBackGround("#HomePageAvatar",custom.photo.avatar)
    setBackGround('.HomePage>.topwrap',custom.photo.background.homepage)
    console.log("主页挂载")
    yiYan('#Yiyan')
    return ()=>{
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
    }
    },[])
  return (
    <Anchor affix={false}>
        <HomepPageWrapper className='HomePage dark' >
        <HeaderNav />
        {/* 顶部容器 */}

        <div className="topwrap">
          <div className="name">
            <div id='HomePageAvatar' className='avatar' onClick={() => RotateAvatar('HomePageAvatar')}></div>
            <span>Lyra的秘密基地</span>
            <div className="yiyan">
              <span id='Yiyan'></span>
            </div>
          </div>
          <div className='topbottom'>
            <div className="down">
              <Link href="#blogcontainer" title={<DownOutlined style={{ 'fontSize': '30px', 'fontWeight': '900', 'color': '#fff' }} />}></Link>
            </div>
          </div>
        </div>

          <SplitScreen id="#blogcontainer"
          leftWeight={1}
          middleWeight={1}
          rightWeight={1}
          > 
          <div>
          <SortItemByName dataArray={ThreeSortArray(blogdata)[0]} type="class" name="分类" />
          <SortItemByName dataArray={ThreeSortArray(blogdata)[1]} type="tag"name="标签"/>
          <SortItemByName dataArray={ThreeSortArray(blogdata)[2]} type="time"name="时间轴"/>
          </div>
            <HomePageBlogList custom={custom} />
            <AboutMe blogdata={blogdata} custom={custom}/>
          </SplitScreen>
        {/* 底部容器 */}
        <div className="bottomwrapper">
          <BotttomNav />
          <BackToTop />
        </div>
      </HomepPageWrapper>
      </Anchor>
  )
}

export default HomePage

