const jwt = require('jsonwebtoken');
const {secret} =require('../startups/config')
function checkAuth(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,secret);
    req.userData = decodedToken;
    next();
}

module.exports = {
    checkAuth
}