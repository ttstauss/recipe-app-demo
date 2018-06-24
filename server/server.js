const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const { edamamRequest } = require('./requests')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log(process.env.NODE_ENV)

const publicPath = path.join(__dirname, '../public')

const app = express()

let port, server
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
  const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost-cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
  }
  port = 443
  server = https.createServer(options, app)
} else {
  port = process.env.PORT || 3000
  server = http.createServer(app)
}

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`)
})
app.get('/recipe-search', (req, res) => {
  edamamRequest(req, queryResult => {
    return res.json(queryResult)
  })
})

server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})