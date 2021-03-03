const Crypto = require('crypto')
function randomString(size = 21) {  
  return Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size)
}

module.exports={randomString}
