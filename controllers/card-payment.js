const models = require("../models")
const winston = require('winston')
const savingsObjectOnline = require('./depsoits_online')
const {depositHistoryOnline} = require('./depositHostory_online')
require('dotenv').config()

async function receiveCardPayment(req,res){
  const postData = req.body;
if(postData.transactionStatus==='SUCCESS'){
 const savingHistory = new models.DepositHistory(depositHistoryOnline(postData))
 await savingHistory.save();
 await savingsObject(postData);
 return res.status(201).json({message:"Your deposit was recieved by us"}) ;
}
 
}
module.exports= receiveCardPayment
