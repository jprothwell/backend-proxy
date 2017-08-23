var http = require('http')
var url = require('url')
var request = require('request')

const PORT = 3000

var params = process.argv
var destUrl = ''
var token = ''
var readOnly = false

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

var urlParsed = url.parse(destUrl)

const server = http.createServer(function(req, res) {
  if (req.method == 'GET') {
    request(destUrl + req.url, function(err, res, body) {
      console.log(body)
    })
  }
}).listen(PORT)