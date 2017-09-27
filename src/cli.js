#!/usr/bin/env node
const http = require('http')
const url = require('url')
const request = require('request')

const createHandler = require('./lib/index')

const PORT = 3000

var params = process.argv
var proxyUrl = ''
var token = ''
var tokenName = 'token'
var readOnly = false
var useHeaders = false

const printUsage = () => {
  console.log('usage: node cli [--url] [--use-headers] [--token-name] [--token] [--read-only]')
  console.log('url:         The URL to proxy to')
  console.log('token:       Token to use for all requests')
  console.log('token-name:  Name of the token query parameter / header name. (Default = token)')
  console.log('use-headers: Send token as a http header instead of url query (Default = false)')
  console.log('read-only:   Read only API calls. (Default = false)')
}

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
    case '--token-name':
      tokenName = params[index + 1]
      break
    case '--use-headers':
      useHeaders = true
      break
    // Read only flag
    case '--read-only':
      readOnly = true
      break
    case '--help':
      printUsage();
      process.exit(1)
      break
  }
})

if (!proxyUrl || !proxyUrl.length) {
  console.log('No url was passed to proxy from');
  printUsage();
  process.exit(1);
}

const server = http
  .createServer(createHandler({ proxyUrl, token, useHeaders, tokenName, readOnly }))
  .listen(PORT)

console.log('Proxying to ' + proxyUrl)
console.log('Proxified URL http://localhost:' + PORT)
