const request = require('request')

module.exports = function createHandler({ proxyUrl, token, tokenName, readOnly }) {
  return (req, res) => {
    if (!readOnly || (readOnly && req.method == 'GET')) {
      console.log(createUrl(proxyUrl, req, token, tokenName))
      request(createUrl(proxyUrl, req, token, tokenName), function(
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

function createUrl(url, req, token, tokenName) {
  if (token == '') {
    return url.replace(/\/$/, '') + req.url
  } else {
    return url.replace(/\/$/, '') + req.url + '?' + tokenName + '=' + token
  }
}

function inReadOnlyMode(res) {
  res.writeHead(500)
  res.end()
}