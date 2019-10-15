import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class AboutMini extends Component {
  render(){
    return (
      <div className='homeRight'>
        <h2 className='sectionTitle'>about me</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: 'calc(100% - 20px)'}}>
          <div className='miniPhoto' alt="" style={{alignSelf: 'flex-start', backgroundPosition: 'center top', backgroundSize: 'cover', width: '150px', height: '150px', margin: '10px',
            backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/Mike%20De%20Groot-1571059978671.jpg')`}}>
          </div>
          <div style={{margin: '10px', textAlign: 'left'}}>
            Real estate and software are my PB&J. Referred to as the trusty realtor, title guy, foreclosure auction 
            enthusiast, tax sale crasher, short sale winner, Excel magician, macro writer, and web dev hobbyist...
            <a style={{marginLeft: '5px', textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} onClick={()=>{this.props.history.push('/about')}}>view more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AboutMini)