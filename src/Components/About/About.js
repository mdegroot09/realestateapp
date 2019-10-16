import React, {Component} from 'react'
import Footer from '../Footer/Footer'

export default class About extends Component {
  render(){
    return(
      <div style={{paddingTop: '70px', backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/neighborhood-1570799839221.jpg')`}}>
        <div style={{background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{minHeight: 'calc(100vh - 157px)', width: 'calc(100% - 50px)'}}>
            <h1 className='sectionTitle'>about me</h1>
            <div style={{marginBottom: '50px'}}>
              Real estate and software are my PB&J. Referred to as the trusty realtor, title guy, foreclosure auction 
              enthusiast, tax sale crasher, short sale winner, Excel guru, macro-writing magician, and web dev hobbyist...
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
}