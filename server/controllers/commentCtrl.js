module.exports = {
  createComment: (req, res) => {
    let {text, date, post_id} = req.body
    post_id = +post_id
    let user_id = req.session.user.id
    const db = req.app.get('db')
    
    db.commentCtrl.createComment({user_id, text, date, post_id})
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
  }
}