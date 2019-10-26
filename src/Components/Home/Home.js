import React, {Component} from 'react'
import Header from '../Header/Header'
import NewPostLink from './NewPostLink'
import ShowPosts from './ShowPosts'
import {updatePosts} from '../../redux/reducer'
import {connect} from 'react-redux'
import AboutMini from '../About/AboutMini';
import Footer from '../Footer/Footer'
import axios from 'axios';

class Home extends Component {
  constructor(){
    super()
    this.state = {
      viewMore: false,
      postsMax: 5,
      filter: '',
      activeTab: 'draft',
      miniPostsList: 0
    }
  }

  componentDidMount = () => {
    this.getPosts()
    this.updatePostsList()
  }

  getPosts = () => {
    axios.get('/api/getposts')
    .then(res => {
      this.organizePosts(res.data)
    })
    .catch(err => console.log('err:', err))
  }

  organizePosts = (data) => {
    let posts = []
    for (let i = 0; i < data.length; i++){
      if (!posts.map(item => item.id).includes(data[i].postid)){
        posts.push({
          id: data[i].postid,
          title: data[i].title,
          date: data[i].postdatetime,
          text: data[i].posttext,
          draft: data[i].draft,
          imageMain: data[i].imagemain,
          comments: 
            data[i].commentid ?
            [{
              id: data[i].commentid,
              firstName: data[i].firstname,
              lastName: data[i].lastname,
              text: data[i].commenttext,
              date: data[i].commentdatetime
            }] : []
        })
      } else {
        let index = posts.map(item => item.id).indexOf(data[i].postid)
        posts[index].comments.push({
          id: data[i].commentid,
          firstName: data[i].firstname,
          lastName: data[i].lastname,
          text: data[i].commenttext,
          date: data[i].commentdatetime
        })
      }
    }
    this.setState({posts})
    this.props.updatePosts(posts)
  }

  updatePostsList = () => {
    let postsList = document.getElementsByClassName('postsList')[0]
    let miniPostsList = +postsList.offsetWidth
    this.setState({miniPostsList})
  }

  updateFilter = (value) => {
    let val = value.toLowerCase()
    this.setState({filter: val})
    if (val || this.state.viewMore === true){
      this.setState({viewMore: true})
    } else {
      this.setState({viewMore: false})
    }
  }

  updateActiveTab = (name) => {
    this.setState({activeTab: name})
  }

  render(){
    // entire width of postsList
    let {miniPostsList} = this.state
    if (miniPostsList > 0){  // need this to avoid first render error
      let postsList = document.getElementsByClassName('postsList')[0]
      let miniPostsList = +postsList.offsetWidth * .7
      
      // when window width changes, reset miniPostsList
      if (miniPostsList !== this.state.miniPostsList){  
        this.setState({miniPostsList})
      }
    }

    // Loop through posts and display each
    let postsToShow = this.props.posts.filter(post => {
      if (!this.props.isAdmin){
        return !post.draft
      } else {
        return true
      }
    })

    let showPostsArr = postsToShow.filter(post => {
      return (post.title.toLowerCase().includes(this.state.filter) || post.text.toLowerCase().includes(this.state.filter))
    })

    return(
      <div className='homeMainDiv'>
        <Header/>
        <div className='homeDuoDiv' style={{marginTop: '10px'}}>
          <div className='homeLeft' style={{position: 'relative'}}>
            <div className='postsList'>
              <h2 className='sectionTitle'>posts</h2>
              <input onChange={(e) => this.updateFilter(e.target.value)} className='filter' type="text" placeholder='search'/>
              <div className='showPosts'>
                <NewPostLink/>
                { showPostsArr[0].text ? 
                  <ShowPosts
                    showPostsArr={showPostsArr}
                    miniPostsList={miniPostsList}
                    postsMax={this.state.postsMax}
                    viewMore={this.state.viewMore}
                  />
                  : 
                  <div style={{width: '100%', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <img className='rotateImg' src="https://simplejoys.s3.us-east-2.amazonaws.com/loading-1572010083625.png" style={{height: '50px'}} alt="loading icon"/>
                  </div>
                }
                {/* Show either 'View All' or 'View Less' button */}
                {!this.state.filter && postsToShow.length > this.state.postsMax?
                  (!this.state.viewMore ? 
                    <div className='viewMoreBtn' onClick={() => this.setState({viewMore: true})}><span>View All</span></div> 
                    : <div className='viewMoreBtn' onClick={() => this.setState({viewMore: false})}><span>View Less</span></div>)
                      : <></>
                }
              </div>
            </div>
          </div>
          <AboutMini/>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {posts, googleID, isAdmin} = state
  return {posts, googleID, isAdmin}
}

const mapDispatchToProps = {
  updatePosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)