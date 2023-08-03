const express = require('express')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')
const indexRoute = require('./routes/index.route')

// Initilizations
const app = express()

// Settings
app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")

// Setting multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname).toLocaleLowerCase())
  }
})

// Middleware
app.use(multer({
  storage,
  dest: path.join(__dirname, '/public/uploads'),
  //limits: {fileSize: 1000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if(mimetype && extname) {
      return cb(null, true)
    }
    cb("Error: Ext file does not support")
  }
}).single('image'))

// Routes
app.use(indexRoute)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})