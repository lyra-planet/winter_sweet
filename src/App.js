import React, { Component } from 'react'
import Router from './router/router.js'
import './App.css'
export default class App extends Component {    
  render() {
    return (
      <div className='wholecontainer'>
          <Router/>
      </div>
    )
  }
}
