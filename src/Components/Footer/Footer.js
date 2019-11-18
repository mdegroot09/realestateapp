import React, {Component} from 'react'

export default class Footer extends Component {
  render(){
    return(
      // <div style={{position: 'bottom'}}>
      <div className='footer'>
        <div className='footerIcons'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/600px-Linkedin.svg.png" 
            onClick={() => {window.location.href = 'https://www.linkedin.com/in/mike-degroot/'}}
            style={{height: '30px', cursor: 'pointer'}}
            alt="Link to Mike De Groot's LinkedIn"/>
          <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png" 
            onClick={() => {window.location.href = 'https://www.facebook.com/mikeadegroot87'}}
            style={{height: '30px', cursor: 'pointer'}}
            alt="Link to Mike De Groot's Facebook"/>
          <img src="https://icon-library.net/images/github-icon-png/github-icon-png-29.jpg" 
            onClick={() => {window.location.href = 'https://github.com/mdegroot09'}}
            style={{height: '30px', cursor: 'pointer'}}
            alt="Link to Mike De Groot's GitHub"/>
        </div>
        <p className='footerText'>
          Website custom built by Mike De Groot.
        </p>
        <div className="footerIcons footerHide"></div> {/* div is hidden when < 800vw */}
      </div>
    )
  }
}