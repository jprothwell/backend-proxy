var http = require('http')
var url = require('url')
var request = require('request')

const PORT = 3000

var params = process.argv
var destUrl = ''
var token = ''
var readOnly = false

// Parse CLI parameters
params.forEach(function (val, index, array) {
  switch (val) {
    case '--url':
      destUrl = params[index + 1]
    case '--token':
      token = params[index + 1]
    case '--read-only':
      readOnly = true
  }
})

const server = http.createServer(function(req, res) {
  if (req.method == 'GET') {
    proxyRequest(destUrl, req, function(err, body) {
      if (!err) {
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(body), null, 4)
        res.end()
      }
    })
  }
}).listen(PORT)

function proxyRequest(dest, req, callback) {
  return request(dest.replace(/\/$/, "") + req.url, function(err, res, body) {
    callback(err, body)
  })
}