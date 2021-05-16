const models = require("../models")
const savingsObjectOnline = require('./depsoits_online');
const {depositHistoryOnline} = require('./depositHostory_online');
const {investmentRecords} = require('./depsoits');
const winston = require("winston");
require('dotenv').config()

async function receiveCardPayment(req,res){
  const postData = req.body;
  
  if(postData.transactionStatus==='SUCCESS'){
    if(postData.type !==undefined && postData.type =='re-investment'){
      //update the savings table and set the rows whose ids are in the request to false
      let ids =  postData.investmentIDs
      ids = ids.split(',')
      await models.Saving.update(
        {status:false},
         {
           where:{id:ids}
         }
         )
    }else{
      const savingHistory = new models.DepositHistory(depositHistoryOnline(postData))
      await savingHistory.save();// create new deposit history if it is not re-investment
    }

    await savingsObjectOnline(postData);
    await investmentRecords(postData);
    return res.status(201).json({message:"Your deposit was recieved by us"}) ;
  }else{
    return res.status(400).json({error:"There was an error"})
  }
}
module.exports= receiveCardPayment
