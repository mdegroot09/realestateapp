import React from 'react'

export default function Header () {
  return(
    <div className='headerDiv' style={{position: 'relative'}}>
      <img className='headerIcon' style={{width: 'calc(100% - 100px)', height: 'auto', maxWidth: '600px'}} src="https://simplejoys.s3.us-east-2.amazonaws.com/logo%20full%20inverse-1571144571531.png" alt=""/>
      <img className='headerIcon' style={{width: '100vw', height: '250%', position: 'absolute', zIndex: '-10', filter: 'invert(100%)'}} src="https://imageassociatesllc.com/wp-content/themes/oneup-ia/images/blackblur6.png" alt=""/>
    </div>
  )
}