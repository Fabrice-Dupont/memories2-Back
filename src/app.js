require('dotenv').config()
const connection = require('./db-config')
const express = require('express')
const cors = require('cors')
const app = express()

const router = require('./routes/index.routes')

const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/api', router)

app.get('/', (req, res) => {
  res.send("Welcome to '/'")
})

connection.connect(err => {
  if (err) {
    console.error('error connecting :' + err.stack)
  } else {
    console.log('connected as id' + connection.threadId)
  }
})

app.listen(port, () => {
  console.log(`server is listenning on port ${port}`)
})

module.exports = app
