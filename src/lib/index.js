const request = require('request')

module.exports = function createHandler({ proxyUrl, readOnly }) {
  return (req, res) => {
    if (!readOnly || (readOnly && req.method == 'GET')) {
      request(proxyUrl.replace(/\/$/, '') + req.url, function(
        err,
        response,
        body
      ) {
        res.setHeader('Content-Type', 'application/json')
        res.end(body)
      })
    } else {
      inReadOnlyMode(res)
    }
  }
}

function inReadOnlyMode(res) {
  res.writeHead(500)
  res.end()
}