const axios = require('axios');
require('dotenv').config()
axios.defaults.baseURL = "https://sandbox.monnify.com/api/";
const username = process.env.MONNIFY_SECRET_KEY;
const password = process.env.MONNIFY_PASSWORD;
const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
const authorization = `Basic ${encodedBase64Token}`;
const auth=()=> authorization

module.exports=auth