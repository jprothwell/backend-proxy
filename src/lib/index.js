const request = require('request')

module.exports = function createHandler({ proxyUrl, token, tokenName, readOnly }) {
  return (req, res) => {
    if (!readOnly || (readOnly && req.method == 'GET')) {
      req.pipe(
        request({
          url: createUrl(proxyUrl, req, token, tokenName),
          method: req.method,
        }, function(
          err,
          response,
          body
        ) {
          res.setHeader('Content-Type', 'application/json')
          res.end(body.toString())
        })
      )
    } else {
      inReadOnlyMode(res)
    }
  }
}

function createUrl(url, req, token, tokenName) {
  if (token == '') {
    return url.replace(/\/$/, '') + req.url
  } else if (req.url.includes('?')) {
    return url.replace(/\/$/, '') + req.url + '&' + tokenName + '=' + token
  } else {
    return url.replace(/\/$/, '') + req.url + '?' + tokenName + '=' + token
  }
}

function inReadOnlyMode(res) {
  res.writeHead(500)
  res.end()
}