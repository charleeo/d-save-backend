const axios = require('axios');
require('dotenv').config()
axios.defaults.baseURL = "https://sandbox.monnify.com/api/";
const username = process.env.MONNIFY_SECRET_KEY;
const password = process.env.MONNIFY_PASSWORD;

async function authenticateGateWay(){

    try {
  const response=  await  axios.post(
        `v1/auth/login/`,
        {},
        {auth:{username,password}}
      )
    return (response.data.responseBody.accessToken)
    } catch (error) {
     console.log(error.message)
    }
}

module.exports=authenticateGateWay