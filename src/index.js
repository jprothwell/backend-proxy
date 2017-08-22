var http = require('http');

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