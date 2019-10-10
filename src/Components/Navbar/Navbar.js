import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateShowLogin, updateShowRegister, updateUsername, updateIsAdmin, updateUserImg} from '../../redux/reducer';
import axios from 'axios'

class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      scrollY: 0,
      opacity: 1
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

    let {scrollY} = window
    let opacity = 0
    if (scrollY > 0){
      opacity = 0
    } else {
      opacity = 1
    }
    document.getElementsByClassName('navMainInit')[0].style.backgroundImage = `linear-gradient(rgba(19,19,19,${opacity}), rgba(0,0,119,${opacity}), rgba(15,15,170,${opacity}))`
    this.setState({scrollY, opacity})
  }

  updateScroll = ()  => {
    let {scrollY} = window
    // fire change background only when changing to or from scrollY === 0
    if ((scrollY === 0 && this.state.scrollY > 0) || (scrollY > 0 && this.state.scrollY === 0)){
      this.changeBackground(scrollY)
    }
    this.setState({scrollY})
  }

  changeBackground = (scrollY) => {
    var opacity = this.state.opacity
    if (scrollY <= 0){
      window.clearTimeout(this.timerDecrease)
      let increase = (opacity) => {
        this.timerIncrease = setTimeout(() => {
          opacity += .02
          document.getElementsByClassName('navMainInit')[0].style.backgroundImage = `linear-gradient(rgba(19,19,19,${opacity}), rgba(0,0,119,${opacity}), rgba(15,15,170,${opacity}))`
          this.setState({opacity})
          if(opacity >= 1){return}
          increase(opacity)
        }, .01);
      }
      increase(opacity)
    } else {
      window.clearTimeout(this.timerIncrease)
      let decrease = (opacity) => {
        this.timerDecrease = setTimeout(() => {
          opacity -= .02
          document.getElementsByClassName('navMainInit')[0].style.backgroundImage = `linear-gradient(rgba(19,19,19,${opacity}), rgba(0,0,119,${opacity}), rgba(15,15,170,${opacity}))`
          this.setState({opacity})
          if(opacity <= 0){return}
          decrease(opacity)
        }, .01);
      }
      decrease(opacity)
    }
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

  resetSpinImg = () => {
    let navLogo = document.getElementsByClassName('navLogo')[0]
    navLogo.style.transition = ''
    navLogo.style.transform = ''
    this.spinImg = null
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
    let {opacity} = this.state
    window.onscroll = () => {
      this.updateScroll()
    } 

    return(
      <div className='navMainParent'>
        <div className={'navMainInit'}>

          {/* Hide second navbar background if opacity for navMainInit is at 1 */}
          <div className={'navbarInit'} style={opacity >= 1 ? {backgroundImage: 'linear-gradient(transparent, transparent)'} : {backgroundImage: 'linear-gradient(#131313, #000077, rgb(15, 15, 170))'}}>
            <div className='navDivLeft'>
              <Link to='/' style={{textDecoration: 'none', alignItems: 'center'}}>
                <button className='navBtn'>Home</button>
              </Link>
              <Link to='/about' style={{textDecoration: 'none', alignItems: 'center'}}>
                <button className='navBtn'>About</button>
              </Link>
              
              {/* Hamburger Button */}
              <button onClick={this.showHideMenu} className='hamburgerBtn'>
                <img className='hamburger' src="https://simplejoys.s3.us-east-2.amazonaws.com/hamburger%20icon-1570672731519.png" alt=""/>
              </button>
            </div>
            <img className='navLogo' 
              src="https://simplejoys.s3.us-east-2.amazonaws.com/home-grey-1570541513027.png" alt=""/>
            <img className='navLogo' 
              style={{transform: `rotate(${window.scrollY * .30}deg)`, height: '80px'}} 
              src="https://simplejoys.s3.us-east-2.amazonaws.com/circle%20outline-1570542097882.png" alt=""/>
            <div className='navLogo'>
              {/* <h3 className='navTitle'>Real Estate</h3> */}
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
                    <button className='navBtn' onClick={this.logout}>Logout</button>
                  </>
                : 
                  <>
                    <button className='navBtn' onClick={() => this.showHideRegister(false)}>Register</button>
                    <button className='navBtn' onClick={() => this.showHideLogin(false)}>Login</button>
                  </>
              }
            </div>
          </div>
        </div>
        <div className={`navMainInit hideMenu`} >
          <Link to='/' style={{textDecoration: 'none'}}>
            <button className='navBtnHB' onClick={this.showHideMenu}>Home</button>
          </Link>
          <Link to={this.props.isAdmin ? '/newpost' : '/about'} style={{textDecoration: 'none'}}>
            <button className='navBtnHB' onClick={this.showHideMenu}>{this.props.isAdmin ? 'New Post' : 'About'}</button>
          </Link>
          {this.props.userFirstName 
            ? 
              <>
                <div className='navBtnHB'>
                  <div className='userImg' style={{backgroundImage: this.props.userImg ? `url(${this.props.userImg}` : ''}}></div> 
                  <button className='navBtnHB' style={{marginLeft: '0'}}>{this.props.userFirstName}</button>
                </div>
                {/* <button className='navBtnHB'>{this.props.userFirstName}</button> */}
                <button className='navBtnHB' onClick={this.logout}>Logout</button>
              </>
            : 
              <>
                <button className='navBtnHB' onClick={() => this.showHideRegister(true)}>Register</button>
                <button className='navBtnHB' onClick={() => this.showHideLogin(true)}>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)