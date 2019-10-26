import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateShowLogin, updateShowRegister, updateUsername, updateUserImg, updateIsAdmin} from '../../redux/reducer'
import GoogleLogin from 'react-google-login';
import axios from 'axios'

class Auths extends Component{

  hideAuth = () => {
    this.props.updateShowLogin(false)
    this.props.updateShowRegister(false)
  }

  switchToLogin = () => {
    this.props.updateShowLogin(true)
    this.props.updateShowRegister(false)
  }
  
  switchToRegister = () => {
    this.props.updateShowRegister(true)
    this.props.updateShowLogin(false)
  }

  responseGoogle = (response) => {
    this.hideAuth()
    let user = {
      firstName: response.w3.ofa, 
      lastName: response.w3.wea, 
      email: response.w3.U3,
      googleID: response.googleId,
      image: response.w3.Paa
    }
    this.props.updateUserImg(user.image)
    this.props.updateUsername({userFirstName: user.firstName, userLastName: user.lastName, googleID: user.googleID})
    axios.post(`/auth/register`, user)
    .then(res => {
      let loginSuccess = document.getElementsByClassName('loginSuccess')[0]
      loginSuccess.style.display = 'inline'
      setTimeout(() => {
        loginSuccess.style.display = 'none'
      }, 6000);
      axios.post('/auth/checkID', user)
      .then(r => {
        console.log('isAdmin: TRUE')
        this.props.updateIsAdmin(true)
      })
      .catch(e => console.log('isAdmin: FALSE'))
    })
    .catch(err => {
      this.props.updateUserImg('')
      this.props.updateUsername({userFirstName: '', userLastName: '', googleID: ''})
      let loginFail = document.getElementsByClassName('loginFail')[0]
      loginFail.style.display = 'inline'
      setTimeout(() => {
        loginFail.style.display = 'none'
      }, 6000);
      console.log('err:', err)
    })
  }
  
  render(){
    return (
      <>
        {this.props.showLogin || this.props.showRegister ? 

          (<div className='auths'>
            <div className='authImg'></div>
            <div className='authBox'>
              {this.props.showLogin ? <h1 style={{marginBottom: '0'}}>Login</h1> : <h1 style={{marginBottom: '0'}}>Register</h1>}
              <h3 style={{margin: '5px 0 25px 0'}}>via Google Sign-In</h3>
              <GoogleLogin
                clientId="559541228663-ejf0eno7ppa01v2ao1iseb7vspgv5i29.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                className='googleAuth'
                buttonText={'Sign in with Google'}
              />
              <div className='viewMoreBtn' onClick={() => this.hideAuth()} style={{backgroundColor: 'rgb(195, 195, 195)'}}><span>Cancel</span></div>
              {this.props.showLogin ?
                <button className='switchAuth' onClick={this.switchToRegister}>Switch to Register</button>
                :
                <button className='switchAuth' onClick={this.switchToLogin}>Switch to Login</button>
              }
            </div>
          </div>)
            : <></>
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  const {showLogin, showRegister, userFirstName, userLastName} = state
  return {showLogin, showRegister, userFirstName, userLastName}
}

const mapDispatchToProps = {
  updateShowLogin, updateShowRegister, updateUsername, updateUserImg, updateIsAdmin
}

export default connect(mapStateToProps, mapDispatchToProps)(Auths);
