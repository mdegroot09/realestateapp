const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res) => {
    let {email, firstName, lastName, googleID, image} = req.body
    const db = req.app.get('db')
    let userArr = await db.authCtrl.getUser({email})
    let user = userArr[0]

    if (!user) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(googleID, salt)
  
      let registeredUser = await db.authCtrl.registerUser({email, firstName, lastName, hash, image})
      user = registeredUser[0]
  
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        image: user.image
      }
  
      return res.status(201).send(req.session.user)
    } 

    const isAuthenticated = bcrypt.compareSync(googleID, user.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      image: user.image
    }

    return res.status(200).send(req.session.user)
  }, 

  loginUser: async (email, googleID) => {
    const db = req.app.get('db')
    let foundUser = await db.authCtrl.getUser({email})
    let user = foundUser[0]

    const isAuthenticated = bcrypt.compareSync(googleID, user.hash)
    if (!isAuthenticated){
      return res.status(403).send('Incorrect password')
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      image: user.image
    }
    res.status(200).send(req.session.user)
  },

  logout: async (req, res) => {
    req.session.destroy()
    console.log('session ended')
    res.sendStatus(200)
  },

  checkForSession: async (req, res) => {
    res.status(200).send(req.session)
  },

  updateUser: async (req, res) => {
    let {email, firstName, lastName, googleID, image} = req.body
    let {id} = req.session.user
    const db = req.app.get('db')

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(googleID, salt)
    
    let updatedUser = await db.authCtrl.updateUser({email, firstName, lastName, hash, id, image})
    let user = updatedUser[0]
    
    try {
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        image: user.image
      }
      res.status(200).send(req.session.user)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  },

  isAdmin: async (req, res) => {
    let {ADMIN_GOOGLEID, ADMIN_GOOGLEID2} = process.env
    let {googleID} = req.body
    if (googleID === ADMIN_GOOGLEID || googleID === ADMIN_GOOGLEID2){
      try {
        req.session.user.isAdmin = true
        console.log('match')
        res.sendStatus(200)
      } catch {
        res.status(401).send('Please log in first.')
      }
    } else {
      console.log('not a match')
      res.status(401).send('Logged in user is not an admin.')
    }
  }
}