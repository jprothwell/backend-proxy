const request = require('request')

module.exports = function createHandler({ proxyUrl }) {
  return (req, res) => {
    request(proxyUrl.replace(/\/$/, '') + req.url, function(
      err,
      response,
      body
    ) {
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    })
  }
}
