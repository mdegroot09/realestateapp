import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateShowLogin, updateShowRegister, updateUsername, updateIsAdmin, updateUserImg} from '../../redux/reducer';
import axios from 'axios'

class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      scrollY: 0
    }
    this.timerIncrease = null
    this.timerDecrease = null
    this.spinImg = null
  }

  componentDidMount = () => {
    axios.get('/auth/session')
    .then(res => {
      let {user} = res.data
      try {
        if (user.firstName){
          this.props.updateUsername({userFirstName: user.firstName, userLastName: user.lastName})
          this.props.updateUserImg(user.image)
          this.props.updateIsAdmin(user.isAdmin)
        }
      } 
      catch {}
    })
    .catch(e => console.log('server not working:', e)) // catch is user.firstName doesn't exist
  }

  updateScroll = ()  => {
    let {scrollY} = window
    // fire change background only when changing to or from scrollY === 0
    if ((scrollY === 0 && this.state.scrollY > 0) || (scrollY > 0 && this.state.scrollY === 0)){
    }
    this.setState({scrollY})
  }

  startSpin = () => {
    if (!this.spinImg){
      let navLogo = document.getElementsByClassName('navLogo')[0]
      navLogo.style.transition = 'transform 4s'
      navLogo.style.transform = 'rotate(540deg)'
      this.spinImg = setTimeout(() => {
        navLogo.style.transition = ''
        navLogo.style.transform = ''
        this.spinImg = null
      }, 4000);
    }
  }

  showHideMenu = () => {
    let hideMenu = document.getElementsByClassName('hideMenu')[0]
    let showMenu = document.getElementsByClassName('showMenu')[0]
    let homeMainDiv = document.getElementsByClassName('homeMainDiv')[0]
    if (hideMenu){
      hideMenu.className = 'navMainInit showMenu'
      homeMainDiv.style.zIndex = -2
    } else {
      showMenu.className = 'navMainInit hideMenu'
      setTimeout(() => {
        homeMainDiv.style.zIndex = 0
      }, 250);
    }
  }

  showHideLogin = (showHideMenu) => {
    if (showHideMenu){
      this.showHideMenu()
    }
    this.props.updateShowLogin(true)
    this.props.updateShowRegister(false)
  }

  showHideRegister = (showHideMenu) => {
    if (showHideMenu){
      this.showHideMenu()
    }
    this.props.updateShowRegister(true)
    this.props.updateShowLogin(false)
  }

  logout = () => {
    axios.delete('/auth/logout')
    .then(res => {
      this.props.updateUsername({userFirstName: '', userLastName: ''})
      this.props.updateIsAdmin(false)
    })

    // Hide dropdown menu if showing
    let showMenu = document.getElementsByClassName('showMenu')[0]
    let homeMainDiv = document.getElementsByClassName('homeMainDiv')[0]
    if (showMenu){
      showMenu.className = 'navMainInit hideMenu'
      setTimeout(() => {
        homeMainDiv.style.zIndex = 0
      }, 250);
    }
  }

  render(){
    window.onscroll = () => {
      this.updateScroll()
    } 

    return(
      <div className='navMainParent'>
        <div className={'navMainInit'}>
          <div className={'navbarInit'}>
            <div className='navDivLeft'>
              <Link to='/' style={{textDecoration: 'none', alignItems: 'center'}}>
                <button className='navBtn'>home</button>
              </Link>
              <Link to='/about' style={{textDecoration: 'none', alignItems: 'center'}}>
                <button className='navBtn'>about</button>
              </Link>
              
              {/* Hamburger Button */}
              <button onClick={this.showHideMenu} className='hamburgerBtn'>
                <img className='hamburger' src="https://simplejoys.s3.us-east-2.amazonaws.com/hb%20yellow-1570764988629.png" alt=""/>
              </button>
            </div>
            <img className='navLogo' 
              // src="https://simplejoys.s3.us-east-2.amazonaws.com/home-grey-1570541513027-1570764190519.png" alt=""/>
              src="https://simplejoys.s3.us-east-2.amazonaws.com/logo-1571058290907.png" alt=""/>
            <img className='navLogo' 
              style={{transform: `rotate(${window.scrollY * .30}deg)`, height: '78px'}} 
              src="https://simplejoys.s3.us-east-2.amazonaws.com/circle%20outline-1570763994379.png" alt=""/>
            <div className='navLogo'>
              {/* <h3 className='navTitle'>Realty & stuff</h3> */}
            </div>
            <div className='navDivRight'>
              {this.props.userFirstName 
                ? 
                  <>
                    <div className='navBtn'>
                      {/* <div className='userImg' style={{backgroundImage: `url(${this.props.userImg})`}}></div>  */}
                      <div className='userImg' style={{backgroundImage: this.props.userImg ? `url(${this.props.userImg}` : ''}}></div> 
                      <button className='navBtn' style={{marginLeft: '0'}}>{this.props.userFirstName}</button>
                    </div>
                    <button className='navBtn' onClick={this.logout}>logout</button>
                  </>
                : 
                  <>
                    <button className='navBtn' onClick={() => this.showHideRegister(false)}>register</button>
                    <button className='navBtn' onClick={() => this.showHideLogin(false)}>login</button>
                  </>
              }
            </div>
          </div>
        </div>
        <div className={`navMainInit hideMenu`} >
          <Link to='/' style={{textDecoration: 'none'}}>
            <button className='navBtnHB' onClick={this.showHideMenu}>home</button>
          </Link>
          <Link to={this.props.isAdmin ? '/newpost' : '/about'} style={{textDecoration: 'none'}}>
            <button className='navBtnHB' onClick={this.showHideMenu}>{this.props.isAdmin ? 'new post' : 'about'}</button>
          </Link>
          {this.props.userFirstName 
            ? 
              <>
                <div className='navBtnHB'>
                  <div className='userImg' style={{backgroundImage: this.props.userImg ? `url(${this.props.userImg}` : ''}}></div> 
                  <button className='navBtnHB' style={{marginLeft: '0'}}>{this.props.userFirstName}</button>
                </div>
                {/* <button className='navBtnHB'>{this.props.userFirstName}</button> */}
                <button className='navBtnHB' onClick={this.logout}>logout</button>
              </>
            : 
              <>
                <button className='navBtnHB' onClick={() => this.showHideRegister(true)}>register</button>
                <button className='navBtnHB' onClick={() => this.showHideLogin(true)}>login</button>
              </>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {userFirstName, userLastName, userImg, isAdmin} = state
  return {userFirstName, userLastName, userImg, isAdmin}
}

const mapDispatchToProps = {
  updateShowLogin, updateShowRegister, updateUsername, updateIsAdmin, updateUserImg
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))