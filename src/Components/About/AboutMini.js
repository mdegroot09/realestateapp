import React, {Component} from 'react'
import { callbackify } from 'util';

export default class AboutMini extends Component {
  render(){
    return (
      <div className='homeRight'>
        <h2 className='sectionTitle'>About Me</h2>
        <div style={{display: 'flex', justifyContent: 'center', width: 'calc(100% - 20px)'}}>
          <div className='miniPhoto' alt="" style={{backgroundPosition: 'center top', backgroundSize: 'cover', width: '150px', height: '150px', margin: '10px',
            backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/Mike%20De%20Groot-1571059978671.jpg')`}}>
          </div>
          <div style={{margin: '10px', textAlign: 'left'}}>
            Real estate and software are my PB&J. I've sold homes, worked in title, attended various bank foreclosure auctions and county tax sales, and purchased a short-sale. I also studied software development learning HTML, CSS, Javascript, Python, C++, and VBA. I now disrupt the real estate industry working at Homie, a tech company and the future of real estate. 
          </div>
        </div>
      </div>
    )
  }
}