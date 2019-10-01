module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    let postsArr = await db.postCtrl.getPosts()

    return res.status(200).send(postsArr)
  },

  getPost: async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    let postsArr = await db.postCtrl.getPost({id})

    return res.status(200).send(postsArr)
  },

  getComments: async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    let commentsArr = await db.postCtrl.getComments({id})

    return res.status(200).send(commentsArr)
  },

  createPost: async (req, res) => {
    let {postTitle, imageMain, date, family, makeup, food, elements} = req.body
    let textArr = elements.map(element => {
      if (element.text){
        return element.text + ' '
      } else {
        return ''
      }
    })
    let text = textArr.join('').trim()

    const db = req.app.get('db')
    let postsArr = await db.postCtrl.createPost({postTitle, family, makeup, food, date, imageMain, text})
    let post_id = postsArr[0].id

    createElement = (i) => {
      let {type, text, quote, person, url, url2} = elements[i]
      if (!text) {text = ''} 
      if (!quote) {quote = ''}
      if (!person) {person = ''}
      if (!url) {url = ''}
      if (!url2) {url2 = ''}
      db.postCtrl.createElement({type, text, quote, person, url, url2, post_id})
      .then(e => {
        if (i + 1 < elements.length){
          createElement(i + 1)
        } else return
      })
      .catch(err => {
        res.sendStatus(err)
      })
    }

    createElement(0)
    
    res.status(201).send({post_id})
  },

  deleteComment: async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    await db.postCtrl.deleteComment({id})

    return res.sendStatus(200)
  },

  updatePost: async (req, res) => {
    let {elements, family, makeup, food, postTitle, imageMain, id} = req.body
    const db = req.app.get('db')
    let textArr = elements.map(element => {
      if (element.text){
        return element.text + ' '
      } else {
        return ''
      }
    })
    let text = textArr.join('').trim()

    await db.postCtrl.updatePost({id, family, makeup, food, postTitle, imageMain, text})
    await db.postCtrl.deleteElements({id})

    createElement = (i) => {
      let {type, text, quote, person, url, url2} = elements[i]
      let post_id = id
      if (!text) {text = ''} 
      if (!quote) {quote = ''}
      if (!person) {person = ''}
      if (!url) {url = ''}
      if (!url2) {url2 = ''}
      db.postCtrl.createElement({type, text, quote, person, url, url2, post_id})
      .then(e => {
        if (i + 1 < elements.length){
          createElement(i + 1)
        } else return
      })
      .catch(err => {
        res.sendStatus(err)
      })
    }

    createElement(0)

    return res.sendStatus(200)
  },

  deletePost: async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    await db.postCtrl.deleteComments({id})
    await db.postCtrl.deleteElements({id})
    await db.postCtrl.deletePost({id})
    
    return res.sendStatus(200);
  }
}