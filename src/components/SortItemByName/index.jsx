import React from 'react'
import { Link } from 'react-router-dom'
import { memo } from 'react'
import styled from 'styled-components'


const LeftMiniList=styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 20px;
    margin-top: 30px;
    max-width: 400px;
    min-width: 200px;
    /* height: 300px; */
    color: var(--TextGray);
    transition: all 0.3s;
    background-color: rgba(255,255, 255,0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 3px rgba(0,0,0, 0.2);
    position: relative;
    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0, 0.2);
    }

`

const LeftMiniListItem = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
    margin: 10px;
    color: rgb(104, 104, 104);
    border-radius: 20px;
    padding: 5px;
    line-height: 20px;
    transition: all 0.3s;
    font-size: 20px;
`


const SortItemByName = memo(({
    dataArray,type,name,index
}) => {
    return (
        <div>
        <Link to="/library/" index={index} >
            <LeftMiniList>
            <div>{name}</div>
            {
            dataArray&&dataArray.map((data,index)=>{          
                return (
                <LeftMiniListItem key = {index}>
                    <div>{data[type]}</div>               
                    <div>{data.data.length}</div>
                </LeftMiniListItem>)
            })
        }
        </LeftMiniList>
        </Link>
        </div>
    )
})

export default SortItemByName