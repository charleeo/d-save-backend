const Crypto = require('crypto')
function randomString(size = 15) {  
  const str= Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size)
    return str.toUpperCase()
}

module.exports={randomString}
