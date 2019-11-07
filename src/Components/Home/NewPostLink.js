import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class NewPostLink extends Component {
  render(){
    return(
      <>
        {this.props.isAdmin ?
          <div className='viewMoreBtn' onClick={() => this.props.history.push('/newpost')} style={{backgroundColor: '#2b9fdd', position: 'absolute', top: '20px', right: '15px', margin: '0'}}>
            New Post
          </div>
        : <div></div>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  const {isAdmin} = state
  return {isAdmin}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPostLink))