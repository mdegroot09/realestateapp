import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function ShowPosts (props) {
  let showPosts = props.showPostsArr.map((post, i) => {
    // Only display the latest 5 posts 
    if (i > props.postsMax - 1 && props.viewMore === false){return false}
    let arr = post.text.split('')
    var text = post.text
    // Condense post and end with '...' if arr > indexStart
    let indexStart = (props.miniPostsList - 100) / 3
    if (arr.length > indexStart){
      // If the last item in the array is a space or period, begin '...' one index sooner
      if (arr[indexStart - 1] === ' ' || arr[indexStart - 1] === '.') {
        indexStart -= 1
      }
      arr.splice(indexStart, arr.length - indexStart + 1, '...')
      text = arr.join('')
    }
    let date = new Date(+post.date)

    return (
      <Link to={`/post/${post.id}`} key={i} style={{textDecoration: 'none'}} className='miniPost'>
        {i % 2 !== 0 ? <div className='miniPhoto' style={{backgroundImage: `url(${post.imageMain})`, backgroundPosition: 'center center', backgroundSize: 'cover'}} alt=""></div> : <></>}
        <div className='postDiv'>
          <h3 className='postTitle' style={i % 2 !== 0 ? {alignSelf: 'flex-end', textAlign: 'right'} : {}}>{post.title}</h3>
          <p className='postSubTitle' style={i % 2 !== 0 ? {alignSelf: 'flex-end'} : {}}>{moment(date).fromNow()}</p>
          <div className='postTextDiv'>
            <p className='postText' style={i % 2 !== 0 ? {textAlign: 'end'} : {}}>{text}</p>
          </div>
        </div>
        {i % 2 === 0 ? <div className='miniPhoto miniPhotoRight' style={{backgroundImage: `url(${post.imageMain})`, backgroundPosition: 'center center', backgroundSize: 'cover'}} alt=""></div> : <></>}
      </Link>
    )
  })

  return showPosts
}