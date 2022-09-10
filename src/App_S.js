
import styled from 'styled-components'
import {TCC} from './assets/styles/defaultFunc'

export const Wholecontainer = styled(TCC)`
    font-weight: 500;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    overflow-y: scroll;
   background-color: ${({ theme }) => {
    console.log(theme.background)
    return theme.background }};
 &::-webkit-scrollbar {
    width: 10px;
    opacity: 0.1;
    height: 10px;
  }
 &::-webkit-scrollbar-track {
    opacity: 0;
    background-color: rgba(255, 255, 255, 0)
}
 &::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    background-color:rgb(245,94,105);
 }
`

