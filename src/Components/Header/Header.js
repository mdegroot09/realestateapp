import React from 'react'

export default function Header () {
  return(
    <div className='headerDiv'>
      <img className='headerIcon' src="https://simplejoys.s3.us-east-2.amazonaws.com/simplejoysyellow-1566262672906.png" alt=""/>
      <div className='headerTitle'>Simple Joys
        <span id='subtitleFull'>Celebrating the little things</span>
        <span id='subtitlePart1'>Celebrating the</span>
        <span id='subtitlePart2'>little things</span>
      </div>
    </div>
  )
}