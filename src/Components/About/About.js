import React, {Component} from 'react'
import Footer from '../Footer/Footer'

export default class About extends Component {
  render(){
    return(
      <div className='homeMainDiv' style={{paddingTop: '80px', backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/neighborhood-1570799839221.jpg')`, height: 'auto', width: 'inherit'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{background: 'white', minHeight: 'calc(100vh - 162px)', width: 'calc(100% - 20px)', maxWidth: '800px', display: 'flex', justifyContent: 'center', borderRadius: '5px', marginBottom: '10px'}}>
            <div style={{width: 'calc(100% - 50px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left'}}>
              <h1 className='sectionTitle'>about me</h1>
              <div className='aboutPhoto'></div>
              <div style={{}}>
                <h4>My sweet spot</h4>
                <p>
                  Real estate and software are my PB&J. A DIY-minded entrepreneur, I've gone from selling millions in homes and
                  crashing foreclosure auctions & tax sales to optimizing business processes through Excel macros and developing 
                  websites in my spare time.
                </p>
                {/* <p>
                  Most people don't know much about real estate. I built this site to educate the average
                  person on various real estate stuffs.   
                </p> */}
                <h4>My crazy family</h4>
                <p>
                  My wife and I were married in 2009 and now have four insane kids ranging from 9 to 1. Getting tackled 
                  as I walk in the door is a daily occurrence. Whether it's practicing baseball or soccer, playing with dolls or 
                  dancing to "Baby Shark", my kids keep me moving. My wife and I are really just big kids, so naturally we went 
                  to Disney World and Harry Potter World for our 10-year anniversary. 
                </p>
                {/* <h4>Truth bomb... Real Estate Agents really aren't that experienced</h4>
                <p>
                  In Utah, where I live, there are over 21,000 licensed real estate agents and not enough deals for each of them. 
                  The average agent closes less than three transactions a year... That's not a whole lot of experience for a so-called 
                  expert. Here it takes 120 hours of real estate courses and a test to become a licensed agent. 
                  That's it. Aspiring cosmetologists get 2,000 hours of courses, an associate's degree, and a crazy state exam 
                  before they can touch your hair that'll grow back in two weeks. Seems lopsided since agents are dealing with
                  your greatest financial asset.
                </p>
                <p>
                  Real estate is a fragmented market. In most industries, the top 20% performers are doing 80% of the work. Real estate,
                  however, is completely different. Here in Utah, 75% of deals are done by agents doing 8 deals or less. 
                  So chances are your licensed agent brother-in-law, cousin, and neighbor's dog all don't really know how to help you 
                  avoid liability. 
                </p> */}
                <p>
                  I'll tell you everything I know.
                </p>
                <h4 className='aboutContact'>Have a real estate question or blog request? <a href="mailto:mikeadegroot@gmail.com?subject=Real Estate and Stuffs">Send me an email</a></h4>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}