const Models = require("../models")
const winston = require('winston')
const crypto = require('crypto')
const axios =require('axios')
const {authenticateGateWay}=require('../middleware/authenticate_gateway')
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
  const transactionHash =  Buffer.from(postData.transactionHash)//from the gate way
  const hash= await createHash(postData,key)//calculated here in the app
  // winston.info(postData)

 if(crypto.timingSafeEqual(hash,transactionHash)){//check for equality

 const endpoint= `v2/transactions/${postData.transactionReference}`

 let token = await authenticateGateWay();
  const config = {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
};
 
const  transactionStatus= await axios.get(endpoint,config)
// 1000003298 
if(transactionStatus.data.requestSuccessful===true && transactionStatus.data.responseMessage==='success'){
 res.status(200).send('OK')
 const dataToSave = {
  transactionReference  ,
  paymentReference ,
  amountPaid ,
  totalPayable ,
  settlementAmount ,
  paidOn ,
  paymentStatus ,
  paymentDescription ,
  currency ,
  paymentMethod , 
  product,
  cardDetails,
  accountDetails,
  accountPayments,
  customer
  }=postData;
 const{customerEmail,customerName}=dataToSave.customer
 const completeDataToSave = {dataToSave,customerEmail,customerName,transactionHash}
 winston.info(completeDataToSave)
 const depositHistory=new Models.deposithistory(completeDataToSave)
 await depositHistory.save();
 return res.status(201).json({Message:"Account created successfully",
   Result:completeDataToSave})

}
 }else{
   winston.info("The strings do not match")
 }
}

module.exports= {receivePayment}
