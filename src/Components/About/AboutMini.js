import React, {Component} from 'react'

export default class AboutMini extends Component {
  render(){
    return (
      <div className='homeRight'>
        <h2 className='sectionTitle'>About Me</h2>
        <div className='miniPhoto' alt="" style={{backgroundPosition: 'center top', backgroundSize: 'cover', width: '150px', height: '150px', margin: '10px',
          backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/De%20Groot%20Fam-1566229248216.jpg')`}}>
        </div>
      </div>
    )
  }
}