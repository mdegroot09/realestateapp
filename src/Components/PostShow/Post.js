import React, {Component} from 'react'
import {connect} from 'react-redux'
import Comments from '../Comments/Comments';
import {withRouter} from 'react-router-dom';
import moment from 'moment'
import Footer from '../Footer/Footer'
import axios from 'axios'

class Post extends Component {
  constructor (){
    super()
    this.state = {
      post: {
        elements: [],
        imageMain: ''
      },
      comments: []
    }
  }

  componentDidMount = () => {
    // Bring the scroll to the top of the page on initial render
    window.scrollTo(0, 0)

    this.getPost()
  }

  getPost = () => {
    axios.get(`/api/getpost/${this.props.match.params.id}`)
    .then(res => {
      let {post} = this.state
      post.title = res.data[0].title
      post.imageMain = res.data[0].imagemain
      post.date = res.data[0].postdatetime
      post.draft = res.data[0].draft
      post.elements = res.data.map(element => {
        return {
          type: element.elementtype,
          text: element.elementtext,
          url: element.elementurl,
          url2: element.elementurl2,
          quote: element.elementquote,
          person: element.elementperson,
          viewDraft: true
        }
      })
      this.setState({post})
      axios.get(`/api/getcomments/${this.props.match.params.id}`)
      .then(res => {
        this.setState({comments: res.data})
      })
    })    
  }

  addComment = (comment) => {
    let {comments} = this.state
    let {text, date} = comment
    let post_id = this.props.match.params.id

    comments.push(comment)
    this.setState({comments})

    axios.post('/api/createcomment', {text, date, post_id})
    .then(res => {
      this.getPost()
    })
    .catch(err => console.log(err))
  }

  deletePost = () => {
    if (window.confirm('Are you sure you wish to delete this post and its comments?')){
      axios.delete(`/api/deletePost/${this.props.match.params.id}`)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(err => console.log('err:', err))
    }
  }

  deleteComment = (id) => {
    if (window.confirm('Are you sure you wish to delete this comment?')){
      axios.delete(`/api/deletecomment/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      let index = this.state.comments.findIndex(comments => {
        return comments.id === id
      })
      let {comments} = this.state
      comments.splice(index, 1)
      this.setState({comments})
      this.getPost()
    } 
  }

  render(){
    let {post} = this.state
  
    let showElements = post.elements.map((element, i) => {
      if (element.type === 'sectionHeader'){
        return (
          <div className='postElement' style={{border: 'none'}} key={i}>
            <div className='paragraph'>
              <h3 className='newPostHeader' style={{width: '100%', textAlign: 'left', margin: '0', fontSize: '28px', fontWeight: '100'}}>
                {element.text}
              </h3>
            </div>
          </div>
        ) 
      } else if (element.type === 'paragraph'){
        return (
          <div className='postElement' style={{border: 'none'}} key={i}>
            <div className='paragraph' style={{cursor: 'pointer'}}>
              <h3 className='newPostHeader' style={{textAlign: 'start', marginLeft: '0'}}>
                {element.text}
              </h3>
            </div>
          </div>
        )
      } else if (element.type === 'quote'){
        return (
          <div className='postElement' style={{border: 'none'}} key={i}>
            <div className='quoteBackground'>
              <div className='quoteInput' style={{flexDirection: 'column', alignItems: 'center', cursor: 'pointer', maxWidth: '100%'}}>
                <h3 className='quote'>
                  "{element.quote}"
                </h3>
                <h3 className='newPostHeader' style={{alignSelf: 'flex-end', margin: '0 10px 0 0'}}>
                  - {element.person}
                </h3>
              </div>
            </div>
          </div>
        )
      } else if (element.type === 'imageLeft'){
        return (
          <div className='postElement' style={{border: 'none', cursor: 'pointer'}} key={i}>
            <div style={{display: 'flex', alignItems: 'center', width: 'inherit', justifyContent: 'space-evenly'}} >
              <div style={{width: 'calc(50% - 15px)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className='newPostImg' style={{width: '100%', backgroundImage: `url('${element.url}')`}}></div>
              </div>
              <div style={{width: 'calc(50% - 15px)', display: 'flex', alignItems: 'center'}}>
                <div className='quoteInput' style={{flexDirection: 'column', alignItems: 'center'}}>
                  <h3 className='newPostHeader' style={{width: '100%', textAlign: 'left', margin: '0'}}>
                    {element.text}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )
      } else if (element.type === 'imageRight'){
        return (
          <div className='postElement' style={{border: 'none', cursor: 'pointer'}} key={i}>
            <div style={{display: 'flex', alignItems: 'center', width: 'inherit', justifyContent: 'space-evenly'}} >
              <div style={{width: 'calc(50% - 15px)', display: 'flex', alignItems: 'center'}}>
                <div className='quoteInput' style={{flexDirection: 'column', alignItems: 'center'}}>
                  <h3 className='newPostHeader' style={{width: '100%', textAlign: 'left', margin: '0'}}>
                    {element.text}
                  </h3>
                </div>
              </div>
              <div style={{width: 'calc(50% - 15px)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className='newPostImg' style={{width: '100%', backgroundImage: `url('${element.url}')`}}></div>
              </div>
            </div>
          </div>
        )
      } else if (element.type === 'imageSingle'){
        return (
          <div className='postElement' style={{border: 'none'}} key={i}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div className='newPostImg' style={{backgroundImage: `url('${element.url}')`, height: '200px', maxWidth: '300px'}}></div>
            </div>
          </div>          
        )
      } else if (element.type === 'imageDouble'){
        return (
          <div className='postElement' style={{border: 'none'}} key={i}>
            <div style={{width: 'inherit', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
              <div style={{width: 'calc(50% - 15px)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className='newPostImg' style={{backgroundImage: `url('${element.url}')`}}></div>                
              </div>
              <div style={{width: 'calc(50% - 15px)', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '5px'}}>
                <div className='newPostImg' style={{backgroundImage: `url('${element.url2}')`}}></div>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div key={i}></div>
      )}
    })

    return(
      <div className='homeMainDiv'>
        <div className='homeDuoDiv' style={{marginTop: '0'}}>
          <div className='homeLeft' style={{position: 'relative'}}>
            <div className='postsList'>
              <h2 className='sectionTitle'>{post.title}</h2>
              { this.props.isAdmin 
                ?
                <>
                  <div className='editPost'>
                    <img className='editIcon' src="https://simplejoys.s3.amazonaws.com/icon-edit-1-1567023411509.jpg" alt="edit icon"
                    onClick={() => this.props.history.push(`/editpost/${this.props.match.params.id}`)}/>
                  </div>
                  <div className='deletePost'>
                    <img className='deleteIcon' src="https://simplejoys.s3.amazonaws.com/delete%20icon-1567091786148.png" alt="delete icon"
                    onClick={() => this.deletePost()}/>
                  </div>
                </>
                : <></>
              }
              <h3 style={{margin: '0', fontSize: '20px', color: 'black'}}>
                {post.date 
                  ? moment(new Date(+post.date)).fromNow() 
                  : ''
                }
              </h3>
              <div className='showPost' style={{width: 'calc(100% - 20px)', maxWidth: '700px'}}>
                <div style={{width: 'calc(100% - 50px)', maxWidth: '500px'}}>
                  <div className='mainPhoto' alt="" style={{backgroundPosition: 'center top', backgroundSize: 'cover', backgroundImage: `url(${post.imageMain})`}}></div>                
                </div>
                {showElements}
              </div>
            </div>
          </div>
          <Comments 
            comments={this.state.comments}
            addComment={this.addComment}
            deleteComment={this.deleteComment}
          />
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {posts, isAdmin} = state
  return {
    posts, isAdmin
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post))