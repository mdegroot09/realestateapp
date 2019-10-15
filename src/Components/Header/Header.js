import React from 'react'

export default function Header () {
  return(
    <div className='headerDiv'>
      {/* <img className='headerIcon' src="https://simplejoys.s3.us-east-2.amazonaws.com/home-grey-1570541513027.png" alt=""/> */}
      <div className='headerTitle'>Realty & stuff
        <span id='subtitleFull'>with Mike De Groot</span>
        <span id='subtitlePart1'>with Mike De Groot</span>
        {/* <span id='subtitlePart2'>little things</span> */}
      </div>
    </div>
  )
}