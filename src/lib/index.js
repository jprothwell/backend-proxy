const request = require('request')

module.exports = function createHandler({ proxyUrl, readOnly }) {
  return (req, res) => {
    (!readOnly || (readOnly && req.method == 'GET')) ? request(proxyUrl.replace(/\/$/, '') + req.url, function(
      err,
      response,
      body
    ) {
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    }) : inReadOnlyMode(res)
  }
}

function inReadOnlyMode(res) {
  console.log("GET requests only in read only mode")
  res.end()
}