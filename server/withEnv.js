const path = require('path')
module.exports = () =>
  require('dotenv').load({ path: path.join(__dirname, '..', '.env') })
