import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class AboutMini extends Component {
  render(){
    var text = "Real estate and software development are my PB and J. I've sold millions in homes, crashed several foreclosure auctions and tax sales, and developed software and websites in various coding languages. Now I work for a real estate tech company called Homie, which I believe to be the future of real estate buying and selling."
    let arr = text.split('')

    // Condense post and end with '...' if arr > indexStart
    let indexStart = (this.props.miniPostsList - 30) / 2
    if (arr.length > indexStart){
      // If the last item in the array is a space or period, begin '...' one index sooner
      if (arr[indexStart - 1] === ' ' || arr[indexStart - 1] === '.') {
        indexStart -= 1
      }
      arr.splice(indexStart, arr.length - indexStart + 1, '...')
      text = arr.join('')
    }

    return (
      <div className='homeRight' style={{marginTop: '10px'}}>
        <h2 className='sectionTitle'>about me</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: 'calc(100% - 20px)'}}>
          <div className='miniPhoto' alt="" style={{alignSelf: 'flex-start', backgroundPosition: 'center top', backgroundSize: 'cover', width: '150px', height: '150px', margin: '10px',
            backgroundImage: `url('https://simplejoys.s3.us-east-2.amazonaws.com/Mike%20De%20Groot-1571059978671.jpg')`}}>
          </div>
          <div style={{margin: '10px', textAlign: 'left'}}>
            {text}
            <a style={{marginLeft: '5px', textDecoration: 'underline', color: 'blue', cursor: 'pointer'}} onClick={()=>{this.props.history.push('/about')}}>view more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AboutMini)