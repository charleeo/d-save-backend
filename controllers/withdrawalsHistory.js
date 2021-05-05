const models = require("../models")
const winston = require('winston')


async function withdrawalsData(data){
   const {
      userEmail,
      amount, 
      reference,
      narration,
      currency, 
      fee, 
      status, 
      transactionDescription, 
      transactionReference,
      destinationBankCode, 
      destinationAccountNumber, 
      destinationAccountName,
      destinationBankName,
      createdOn
   }=data;
   //check if the person has enough funds to withdraw
}


module.exports= withdrawalsData

