const http = require('http')
const https = require('https')
const { parse: parseUrl } = require('url')

const request = function(url, options, cb) {
  const parsedUrl = parseUrl(url)
  const opts = Object.assign(options, {
    port: parsedUrl.port,
    hostname: parsedUrl.hostname,
    path: parsedUrl.path
  })

  if (parsedUrl.protocol === 'https:') {
    return https.request(opts, cb)
  }

  return http.request(opts, cb)
}

module.exports = function createHandler({
  proxyUrl,
  token,
  tokenName,
  readOnly,
  useHeaders
}) {
  return (req, res) => {
    // filter out unwanted headers
    const headers = Object.keys(req.headers).reduce((obj, key) => {
      if (
        /(x-|host|if-|origin|access-|accept|connection|referer|user-)/.exec(key)
      ) {
        return obj
      }

      obj[key] = req.headers[key]
      return obj
    }, {})

    if (useHeaders) {
      headers[tokenName] = token
    }

    if (
      !readOnly ||
      (readOnly && ['GET', 'OPTIONS'].indexOf(req.method) !== -1)
    ) {
      const url = useHeaders
        ? createUrl(proxyUrl, req)
        : createUrl(proxyUrl, req, token, tokenName)

      const proxyReq = request(
        url,
        {
          method: req.method,
          headers
        },
        proxyRes => {
          const responseHeaders = proxyRes.headers

          // enable CORS
          const origin = req.headers['origin'],
            requestedMethods = req.headers['access-control-request-method']
          responseHeaders['Access-Control-Allow-Credentials'] = 'true'
          if (origin) {
            responseHeaders['Access-Control-Allow-Origin'] = origin
          }
          if (requestedMethods) {
            responseHeaders['Access-Control-Allow-Methods'] = requestedMethods
          }

          res.writeHead(proxyRes.statusCode, responseHeaders)
          proxyRes.pipe(res)
        }
      ).on('error', err => {
        res.statusCode = 500
        res.end()
      })
      req.pipe(proxyReq)
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
