const models = require("../models")
const winston = require('winston')
const savingsObject = require('./depsoits')
const {depositHistory} = require('./depositHostory')
require('dotenv').config()

async function receiveCardPayment(req,res){
  const postData = req.body;
if(postData.transactionStatus==='SUCCESS'){
 const savingHistory = new models.DepositHistory(depositHistory(postData))
 await savingHistory.save();
 await savingsObject(postData);
 return res.status(201).json({message:"Your deposit was recieved by us"}) ;
}
 
}
module.exports= receiveCardPayment
