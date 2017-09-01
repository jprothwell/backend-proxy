const request = require('request')

module.exports = function createHandler({ proxyUrl, token, readOnly }) {
  return (req, res) => {
    if (!readOnly || (readOnly && req.method == 'GET')) {
      request(createUrl(proxyUrl, req, token), function(
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

function createUrl(url, req, token) {
  if (token == '') {
    return url.replace(/\/$/, '') + req.url
  } else {
    return url.replace(/\/$/, '') + req.url + '?token=' + token
  }
}

function inReadOnlyMode(res) {
  res.writeHead(500)
  res.end()
}