const models = require("../models")
const winston = require('winston')
const crypto = require('crypto')
const axios =require('axios')
const authenticateGateWay=require('../middleware/authenticate_gateway');
const savingsObject = require('./depsoits')
const {depositHistory,createHash} = require('./depositHostory')
require('dotenv').config()

async function receivePayment(req,res){
  const postData = req.body;
  const key = process.env.MONNIFY_PASSWORD
  const transactionHash =  Buffer.from(postData.transactionHash)//from the gate way
  const hash= await createHash(postData,key)//calculated here in the app

 if(crypto.timingSafeEqual(hash,transactionHash)){//check for equality
 const endpoint= `v2/transactions/${postData.transactionReference}`
 let token = await authenticateGateWay();
  const config = {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
};
const  transactionStatus= await axios.get(endpoint,config)

if(transactionStatus.data.requestSuccessful===true && transactionStatus.data.responseMessage==='success'){
  // 5000728971 

 res.status(200)
 const savingHistory = new models.DepositHistory(depositHistory(postData))
 await savingHistory.save();
 await savingsObject(postData);
 return res.json({message:"We have received your savings"}) ;
}
 }else{
   winston.info("The strings do not match")
 }
}
module.exports= receivePayment
