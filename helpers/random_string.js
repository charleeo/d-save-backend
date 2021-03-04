const Crypto = require('crypto')
function randomString(size = 15) {  
  return Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size)
    .toUpperCase()
}

module.exports={randomString}
