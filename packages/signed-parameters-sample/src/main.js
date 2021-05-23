const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3001

app.use(express.static('public'))

app.get('/token', (req, res) => {
  const token = jwt.sign({ params: { userId: '123' } }, 'test-secret')
  res.send(token)
})

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
})
