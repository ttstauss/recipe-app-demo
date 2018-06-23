const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const publicPath = path.join(__dirname, '../public')

let options
if (process.env.NODE_ENV === 'development') {
  options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost-cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
  }
} else {
  options = {}
}

const app = express()
const port = process.env.PORT || 443
const server = https.createServer(options, app)

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`)
})


server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`)
})