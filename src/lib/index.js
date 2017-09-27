const request = require('request')

module.exports = function createHandler({
  proxyUrl,
  token,
  tokenName,
  readOnly,
  useHeaders,
}) {
  return (req, res) => {
    const headers = {};
    if (useHeaders) {
      headers[tokenName] = token;
    }

    if (!readOnly || (readOnly && req.method == 'GET')) {
      const proxyReq = request({
        url: useHeaders ? createUrl(proxyUrl, req) : createUrl(proxyUrl, req, token, tokenName),
        headers,
      });
      req.pipe(proxyReq);
      proxyReq.pipe(res);
    } else {
      inReadOnlyMode(res)
    }
  }
}

function createUrl(url, req, token, tokenName) {
  if (!token) {
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
