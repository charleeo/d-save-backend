const Models = require("../models")
const winston = require('winston')
const crypto = require('crypto')
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
  const key = process.env.MONNIFY_PASSWORD
  const transactionHash = postData.transactionHash
  // const paymentReference = postData.paymentReference
  // const amountPaid = postData.amountPaid
  // const paidOn  = postData.paidOn
  // const transactionReference = postData.transactionReference
  // const text=`${key}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`
  // const hash = crypto.createHash('sha512',key).update(text).digest('hex');

  const newTransactionHash= Buffer.from(transactionHash)
   const hash= await createHash(postData,key)

 if(crypto.timingSafeEqual(hash,newTransactionHash)){
   winston.info('Continue from here')
 }else{
   winston.info("The strings do not match")
 }
}

module.exports= {receivePayment}