const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log(process.env.NODE_ENV)

const publicPath = path.join(__dirname, '../public')

const app = express()

let options, port, server
if (process.env.NODE_ENV === 'development') {
  options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost-cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
  }
  port = 443
  server = https.createServer(options, app)
} else {
  options = {}
  port = process.env.PORT || 3000
  server = http.createServer(app)
}

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`)
})

server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})