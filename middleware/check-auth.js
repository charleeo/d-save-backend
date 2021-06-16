const jwt = require('jsonwebtoken');
const {secret} =require('../startups/config')
function checkAuth(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token)return res.status(400).json('Please provide a token')
        const decodedToken = jwt.verify(token,secret);
        req.userData = decodedToken;
        next();
        
    } catch (error) {
        res.status(401).json(error.message)
    }
}

module.exports = {
    checkAuth
}