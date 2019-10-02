import React from 'react';
import Navbar from './Components/Navbar/Navbar'
import Auth from './Components/Auths/Auths'
import './App.scss'
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter} from 'react-router-dom'
import router from './router'

export default function App() {
  // Hide showing dropdown navbar menu on any non-navbar button click
  let showHideMenu = () => {
    let showMenu = document.getElementsByClassName('showMenu')[0]
    let homeMainDiv = document.getElementsByClassName('homeMainDiv')[0]
    if (showMenu){
      showMenu.className = 'navMainInit hideMenu'
      setTimeout(() => {
        homeMainDiv.style.zIndex = 0
      }, 250);
    } 
  }

  return (
    <Provider store={store}>
      <HashRouter basename='/'>
        <div className="App">
          <Navbar/>
          <div className='loginSuccess'>Login successful</div>
          <div className='loginSuccess loginFail'>Login unsuccessful</div>
          <Auth/>
          <div className='App' onClick={() => showHideMenu()} onTouchMove={() => showHideMenu()}>
            {router}
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}
