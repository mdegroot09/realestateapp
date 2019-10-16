import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateShowLogin} from '../../redux/reducer'
import moment from 'moment'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      newComment: ''
    }
  }

  addComment = () => {
    // Get the current date and time
    let date = Date.parse(new Date())

    let {newComment} = this.state
  
    let comment = {
      id: null,
      firstName: this.props.userFirstName,
      lastName: this.props.userLastName,
      text: newComment,
      date: date
    }
    this.props.addComment(comment)

    let commentInput = document.getElementsByClassName('commentInput')[0]
    commentInput.value = ''
    this.setState({newComment: ''})
  }

  updateNewCommentState = (input) => {
    this.setState({newComment: input})
  }

  login = () => {
    this.props.updateShowLogin(true)
  }
  
  render(){
    // Skip mapping if comments don't exist for a post
    let commentElements = this.props.comments.map((comment, i) => {
      let date = new Date(+comment.date)
      return (
        <div key={i} className='comment'>
          <b className='commentName'>
            {`${comment.firstname} ${comment.lastname} - ${moment(date).fromNow()}`}
          </b>
          <div className='commentText'>
            {comment.text}
          </div>
          {this.props.isAdmin 
            ? <button className='viewMoreBtn' style={{alignSelf: 'center', backgroundColor: 'red', margin: '5px 0 0 0'}}
              onClick={() => this.props.deleteComment(comment.commentid)}>
                Delete
              </button>
            : <></>
          }
        </div>
      )
    })

    return (
      <div className='homeRight' style={{marginTop: '10px'}}>
        <h2 className='sectionTitle'>Comments</h2>
        {commentElements[0] ? commentElements : ''}
        <div className='comment'>
          {this.props.userFirstName ?
            <>
              <b className='commentName'>
                {`${this.props.userFirstName} ${this.props.userLastName}`}
              </b>
              <div className='commentInputDiv'>
                <input className='filter commentInput' onChange={(e) => this.updateNewCommentState(e.target.value)} style={{backgroundColor: 'rgb(224, 224, 224)'}} type="text" placeholder={`comment`}/>
                <div className='commentBtnDiv'>
                  <div className='viewMoreBtn commentBtn' onClick={this.addComment}>Post</div>
                </div>
              </div>
            </>
            :
            <div className='viewMoreBtn commentBtnAuth' onClick={this.login}>Login to Comment</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {userFirstName, userLastName, isAdmin} = state
  return {userFirstName, userLastName, isAdmin}
}

const mapDispatchToProps = {
  updateShowLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Comments))