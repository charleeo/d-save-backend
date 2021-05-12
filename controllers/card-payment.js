const models = require("../models")
const savingsObjectOnline = require('./depsoits_online');
const {depositHistoryOnline} = require('./depositHostory_online');
const {investmentRecords} = require('./depsoits')
require('dotenv').config()

async function receiveCardPayment(req,res){
  const postData = req.body;
  console.log(postData)
  if(postData.transactionStatus==='SUCCESS'){
    const savingHistory = new models.DepositHistory(depositHistoryOnline(postData))
    await savingHistory.save();
    await savingsObjectOnline(postData);
    await investmentRecords(postData)
    return res.status(201).json({message:"Your deposit was recieved by us"}) ;
  }
}
module.exports= receiveCardPayment
