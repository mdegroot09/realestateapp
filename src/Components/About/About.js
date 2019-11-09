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
              <div>
                <div style={{width: '100%', textAlign: 'center'}}>
                  <h3 style={{fontSize: '22px'}}>
                    Husband
                    <img style={{height: '10px', margin: '3px 8px'}} src="https://simplejoys.s3.us-east-2.amazonaws.com/dot-1573222736999.png" alt="dot icon"/> 
                    Father
                    <img style={{height: '10px', margin: '3px 8px'}} src="https://simplejoys.s3.us-east-2.amazonaws.com/dot-1573222736999.png" alt="dot icon"/> 
                    Realtor Manager
                    <img style={{height: '10px', margin: '3px 8px'}} src="https://simplejoys.s3.us-east-2.amazonaws.com/dot-1573222736999.png" alt="dot icon"/> 
                    Title guy
                    <img style={{height: '10px', margin: '3px 8px'}} src="https://simplejoys.s3.us-east-2.amazonaws.com/dot-1573222736999.png" alt="dot icon"/> 
                    Software developer
                  </h3>
                </div>
                <h3 className='aboutSubHeader'>
                  What I do
                </h3>
                <p className='aboutParagraph'>
                  Real estate and software development are my PB and J. I've sold millions in homes, crashed several foreclosure auctions 
                  and tax sales, and developed software and websites in various coding languages. Now I manage real estate agents for
                  real estate tech company <a style={{textDecoration: 'none'}} href="https://www.homie.com">Homie</a>, the future of 
                  real estate buying and selling.
                </p>
                <h3 className='aboutSubHeader'>
                  The whole fam damily
                </h3>
                <p className='aboutParagraph'>
                  My wife and I have four insane kids ranging from 9 to 1. I used to be a normal person doing normal things.
                  Now I play with dolls, dance to "Baby Shark", and cry at movies.
                </p>
                <h3 className='aboutSubHeader'>
                  My por kay
                </h3>
                <p className='aboutParagraph'>
                  I built this site just so I could write some code. Writing a real estate blog is my attempt to add value, although 
                  my college English professors would likely suggest otherwise. At this point, I'll be happy if my mother reads it.
                </p>
                {/* <h3>Truth bomb... Real Estate Agents really aren't that experienced</h3>
                <p>
                  In Utah, where I live, there are over 21,000 licensed real estate agents and not enough deals for each of them. 
                  The average agent closes less than three transactions a year... That's not a whole lot of experience for a so-called 
                  expert. Here it takes 120 hours of real estate courses and a test to become a licensed agent. 
                  That's it. Aspiring cosmetologists get 2,000 hours of courses, an associate's degree, and a crazy state exam 
                  before they can mess up your hair that'll grow back in two weeks. 
                </p>
                <p>
                  Real estate is a fragmented market. In most industries, generally the top 20% performers are doing 80% of the work. 
                  Real estate, however, is completely different. Here in Utah, 75% of deals are done by agents doing 8 deals or less. 
                  So chances are your licensed agent brother-in-law, cousin, and neighbor's dog all don't really know how to help you 
                  avoid liability. 
                </p> */}
                <p className='aboutContact'>Have a real estate question or blog request? Send an email to <a href="mailto:mikeadegroot@gmail.com?subject=Real Estate and Stuffs">mikeadegroot@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}