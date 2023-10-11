const helmet = require('helmet')

module.exports = helmet({
  contentSecurityPolicy: false,
  frameguard: false,
  referrerPolicy: false,
  hidePoweredBy: true,
  xssFilter: true,
  noSniff: true
})
