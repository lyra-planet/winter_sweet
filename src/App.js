import React, { useReducer} from 'react'
import Router from './router/router'
import {reducer} from './reducer'
import { ThemeContext } from './context'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme,darkTheme } from './assets/styles/Theme'
import { Wholecontainer } from './App_S'
const initState = {
  theme: 'light',
}

const App = () => {
  const [state,dispatch] = useReducer(reducer,initState)
  console.log(state.theme)
  return (
    <ThemeProvider theme={state.theme==='light'? lightTheme :darkTheme}>
    <ThemeContext.Provider value={[state,dispatch]}>
    <Wholecontainer  className='wholecontainer'>
        <Router/>
    </Wholecontainer>
    </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App
