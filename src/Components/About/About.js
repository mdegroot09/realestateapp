import React, {Component} from 'react'
import Footer from '../Footer/Footer'

export default class About extends Component {
  render(){
    return(
      <div style={{marginTop: '70px'}}>
        <h1 className='sectionTitle'>about me</h1>
        <div style={{marginBottom: '50px'}}>
          Real estate and software are my PB&J. Referred to as the trusty realtor, title guy, foreclosure auction 
          enthusiast, tax sale crasher, short sale winner, Excel guru, macro-writing magician, and web dev hobbyist...
        </div>
        <Footer/>
      </div>
    )
  }
}