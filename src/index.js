import React from 'react';
import ReactDOM from 'react-dom';
import { AliveScope } from 'react-activation'
import App from './App'
ReactDOM.render(
  <AliveScope>
  <App/>
  </AliveScope>

  ,
  document.getElementById('root')
);