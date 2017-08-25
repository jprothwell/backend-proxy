const http = require('http')
const url = require('url')
const request = require('request')

const createHandler = require('./lib/index')

const PORT = 3000

var params = process.argv
var proxyUrl = ''
var token = ''
var readOnly = false

// Parse CLI parameters
params.forEach(function(val, index, array) {
  switch (val) {
    // URL to proxy to
    case '--url':
      proxyUrl = params[index + 1]
      break
    // Token for request
    case '--token':
      token = params[index + 1]
      break
    // Read only flag
    case '--read-only':
      readOnly = true
      break
    case '--help':
      console.log('usage: node cli [--url] [--token] [--read-only]')
      console.log('url:         The URL to proxy to')
      console.log('token:       Token to use for GET requests')
      console.log('read-only:   Read only API calls')
      process.exit(1)
      break
  }
})

const server = http
  .createServer(createHandler({ proxyUrl, token, readOnly }))
  .listen(PORT)

console.log('Proxying to ' + proxyUrl)
console.log('Proxified URL http://localhost:' + PORT)
