require('dotenv').config()
const express = require('express')
const app = express()
const aws = require('aws-sdk')
const bodyParser = require('body-parser')
const massive = require('massive')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const router = express.Router()
const session = require('express-session')
const authCtrl = require('./controllers/authCtrl')
const postCtrl = require('./controllers/postCtrl')
const commentCtrl = require('./controllers/commentCtrl')
const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT, AMAZONID, AMAZONSECRET} = process.env

const s3 = new aws.S3({
  accessKeyId: AMAZONID,
  secretAccessKey: AMAZONSECRET,
  Bucket: 'simplejoys'
})

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'simplejoys',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: {fileSize: 20000000}, // In bytes: 20000000 bytes = 20 MB
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  } 
}).single('profileImage')

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

// router.post('/profile-img-upload', (req, res) => {
app.post('/profile-img-upload', (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors:', error)
      res.json({error: error})
    } else {
      if (req.file === undefined){
        console.log('Error: No File Selected')
        res.json('Error: No File Selected')
      } else {
        const imageName = req.file.key
        const imageLocation = req.file.location
        res.json({
          image: imageName,
          location: imageLocation
        })
      }
    }
  })
})

app.use(express.static(`${__dirname}/../build`))

// app.use(bodyParser({limit: '5000mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

// Initiate user session
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

// Connect server to database
massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  app.listen(SERVER_PORT, () => {
    console.log('Listening on port:', SERVER_PORT)
  })
})

// Auth Controller
app.post('/auth/register', authCtrl.registerUser)
app.post('/auth/login', authCtrl.loginUser)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/session', authCtrl.checkForSession)
app.put('/auth/update', authCtrl.updateUser)
app.post('/auth/checkID', authCtrl.isAdmin)

// Posts Controller
app.get('/api/getposts', postCtrl.getPosts)
app.get('/api/getpost/:id', postCtrl.getPost)
app.get('/api/getcomments/:id', postCtrl.getComments)
app.post('/api/createpost', postCtrl.createPost)
app.delete('/api/deletecomment/:id', postCtrl.deleteComment)
app.put('/api/updatepost', postCtrl.updatePost)
app.delete('/api/deletepost/:id', postCtrl.deletePost)

// Comments Controller
app.post('/api/createcomment', commentCtrl.createComment)