import React, {Component} from 'react'
import Footer from '../Footer/Footer'

export default class About extends Component {
  render(){
    return(
      <div style={{paddingTop: '80px', backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/neighborhood-1570799839221.jpg')`, width: '100vw'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{background: 'white', minHeight: 'calc(100vh - 152px)', width: 'calc(100% - 50px)', maxWidth: '800px', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: 'calc(100% - 50px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left'}}>
              <h1 className='sectionTitle'>about me</h1>
              <div style={{marginBottom: '50px'}}>
                Real estate and software are my PB&J. Referred to as the trusty realtor, title guy, foreclosure auction 
                enthusiast, tax sale crasher, short sale winner, Excel guru, macro-writing magician, and web dev hobbyist...
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
}