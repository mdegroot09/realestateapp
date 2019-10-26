import React, {Component} from 'react'
import Footer from '../Footer/Footer'

export default class About extends Component {
  render(){
    return(
      <div className='homeMainDiv' style={{paddingTop: '80px', backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/neighborhood-1570799839221.jpg')`, height: 'auto', width: '100vw'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{background: 'white', minHeight: 'calc(100vh - 162px)', width: 'calc(100% - 20px)', maxWidth: '800px', display: 'flex', justifyContent: 'center', borderRadius: '5px', marginBottom: '10px'}}>
            <div style={{width: 'calc(100% - 50px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left'}}>
              <h1 className='sectionTitle'>about me</h1>
              <div className='aboutPhoto'></div>
              <div style={{}}>
                <p>
                  Real estate and software are my PB&J. A DIY-minded entrepreneur, I've gone from selling millions in homes to
                  crashing foreclosure auctions & tax sales to writing Excel macros for optimizing business processes and developing 
                  websites in my spare time.
                </p>
                <p>
                  Listen, the average person knows little about real estate. Like very little. I built this site to educate the average
                  person on various real estate stuffs.   
                </p>
                <p>
                  In short, please don't ask your sleezy realtor cousin for real estate advice or spend thousands for a real estate 
                  investor's course... I'll tell you everything I know.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}