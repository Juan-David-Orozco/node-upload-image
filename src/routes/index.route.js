const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/images', (req, res) => {
  res.render('images')
})

router.post('/upload', (req, res) => {
  console.log(req.file)
  if(req.file !== undefined) res.redirect('/images')
  else res.redirect('/')
})

module.exports = router