export const setLocalStorage = (key,value)=>{
    if(value&&key){
        localStorage.setItem(key,value)
    }else{
        throw Error('setLocalStorage - Key Or Value Not Found ')
    }
}

export const getLocalStorage = (key)=>{
    if(key && localStorage.getItem(key)){
        return localStorage.getItem(key)
    }else{
        throw Error('getLocalStorage - Value Not Found ')
        // eslint-disable-next-line no-unreachable
        return null
    }
}

export const removeLocalStorage = (key)=>{
    if(key && localStorage.removeItem(key)){
        return localStorage.removeItem(key)
    }else{
        throw Error('removeLocalStorage - Value Not Found ')
        // eslint-disable-next-line no-unreachable
        return null
    }
}