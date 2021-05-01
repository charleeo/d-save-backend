const axios = require('axios');
require('dotenv').config()
const auth =require('../middleware/monnify_configs')
async function authenticateGateWay(){
    try {
      
      const response = await axios({
        url: 'v1/auth/login/',
        method: 'post',
        headers: {
            Authorization: auth(),
        },
        data    
    });
    return (response.data.responseBody.accessToken)
    } catch (error) {
      console.log(error.message)
    }
}

module.exports={authenticateGateWay}