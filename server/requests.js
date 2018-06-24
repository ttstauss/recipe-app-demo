const request = require('request')

let edamamRequest = (req, callback) => {
  const edamamSecretKey = process.env.EDAMAM_SECRET_KEY
  const edamamAppID = process.env.EDAMAM_APP_ID
  const edamamURL = `https://api.edamam.com/search?q=${req.query.search}&app_id=${edamamAppID}&app_key=${edamamSecretKey}`

  request(edamamURL, (error, response, body) => {
    callback(body)
  })
}

module.exports = { edamamRequest }