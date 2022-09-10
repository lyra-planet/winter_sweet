import {defaultBackGroundUrl}  from '../assets/DefaultData'
export const setBackGround=(itemId='',itemUrl='')=>{
    const item = document.querySelector(itemId)
    if(item){
      if(itemUrl===''){
        // eslint-disable-next-line no-throw-literal
        item.style.backgroundImage = `url(${defaultBackGroundUrl})`
        throw "setBackGround - ItemUrl Not Found"
      }
      item.style.backgroundImage = `url(${itemUrl})`
    }else{
      throw Error('setBackGround - Item Not Found ')
    }
  }