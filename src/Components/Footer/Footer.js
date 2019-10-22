import React, {Component} from 'react'

export default class Footer extends Component {
  render(){
    return(
      // <div style={{position: 'bottom'}}>
      <div className='footer'>
        <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png" 
          onClick={() => {window.location.href = 'https://www.facebook.com/mikeadegroot87'}}
          style={{height: '30px', cursor: 'pointer'}}
          alt="Link to Mike De Groot's Facebook"/>
        Website custom built by Mike De Groot.
      </div>
    )
  }
}