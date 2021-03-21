const Models = require("../models")
const winston = require('winston')
const crypto = require('crypto')
const axios =require('axios')
const authenticateGateWay=require('../middleware/authenticate_gateway')
require('dotenv').config()

const createHash= async(body,key)=>{
  const {transactionReference,amountPaid,paymentReference,paidOn}=body;
  const text=`${key}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`;
  const hash = crypto.createHash('sha512',key).update(text).digest('hex');
  const hashed = Buffer.from(hash)
  return hashed;
}

async function receivePayment(req,res){
  const postData = req.body;
  winston.info(postData)
  const key = process.env.MONNIFY_PASSWORD
  const transactionHash =  Buffer.from(postData.transactionHash)//from the gate way
  const hash= await createHash(postData,key)//calculated here

 if(crypto.timingSafeEqual(hash,transactionHash)){//check for equality

 const endpoint= `https://sandbox.monnify.com/api/v2/transactions/${postData.transactionReference}`

 let token = await authenticateGateWay.authenticateGateWay();
  const config = {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
};

const  transactionStatus= await axios.get(endpoint,config)


const {responseMessage,requestSuccessfull}= transactionStatus
if(requestSuccessfull ===true && responseMessage==='success'){
  winston.info('The transaction status is ok')
}
   winston.info('Continue from here')
   return;
 }else{
   winston.info("The strings do not match")
 }
}

module.exports= {receivePayment}