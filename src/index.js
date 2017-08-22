var http = require('http')
var url = require('url')

var server = http.createServer()

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

http.get({
  host: 'localhost',
  port: PORT,
  path: urlParsed.path,
}, function(res) {
  console.log('GET request')
}).on('error', function(err) {
  console.log(err)
}).end()

server.listen(PORT)