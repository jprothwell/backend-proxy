const request = require('request');

module.exports = function createHandler({ proxyUrl }) {
  return (req, res) => {
    request(dest.replace(/\/$/, '') + req.url, function(err, res, body) {
      res.setHeader('Content-Type', 'application/json');
      res.end(body);
    });
  };
};
