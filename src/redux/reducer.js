const initialState = {
  posts: [{
    id: '',
    title: '',
    date: '',
    text: '',
    family: '',
    makeup: '',
    food: '',
    imageMain: '',
    comments: []
  }],
  userFirstName: '',
  userLastName: '',
  // userImg: 'https://lh4.googleusercontent.com/-lfM1xoFNRgs/AAAAAAAAAAI/AAAAAAAACGU/ahaBO1Z22gM/s96-c/photo.jpg',
  userImg: '',
  showLogin: false,
  showRegister: false,
  isAdmin: false
}

const UPDATE_POSTS = 'UPDATE_POSTS';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_USERIMG = 'UPDATE_USERIMG'
const UPDATE_SHOWLOGIN = 'UPDATE_SHOWLOGIN';
const UPDATE_SHOWREGISTER = 'UPDATE_SHOWREGISTER';
const UPDATE_ISADMIN = 'UPDATE_ISADMIN';

export function updatePosts(posts){
  return {
    type: UPDATE_POSTS,
    payload: posts
  }
}

export function updateUsername(obj){
  return {
    type: UPDATE_USERNAME,
    payload: obj
  }
}

export function updateUserImg(userImg){
  return {
    type: UPDATE_USERIMG,
    payload: userImg
  }
}

export function updateShowLogin(bool){
  return {
    type: UPDATE_SHOWLOGIN,
    payload: bool
  }
}

export function updateShowRegister(bool){
  return {
    type: UPDATE_SHOWREGISTER,
    payload: bool
  }
}

export function updateIsAdmin(bool){
  return {
    type: UPDATE_ISADMIN,
    payload: bool
  }
}

export default function reducer(state=initialState, action) {
  const {type, payload} = action
  switch(type) {
    case UPDATE_POSTS: 
      return {...state, posts: payload}
    case UPDATE_USERNAME:
      return {...state, userFirstName: payload.userFirstName, userLastName: payload.userLastName}
    case UPDATE_USERIMG: 
      return {...state, userImg: payload}
    case UPDATE_SHOWLOGIN:
      return {...state, showLogin: payload}
    case UPDATE_SHOWREGISTER:
      return {...state, showRegister: payload}
    case UPDATE_ISADMIN:
      return {...state, isAdmin: payload}
    default :
      return state
  }
}