const models = require("../models")

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
   const data= {
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
   }
   //check if the person has enough funds to withdraw
   const newWithdrawals= new models.WithdrawalHistory(data)
   return await newWithdrawals.save()
}


module.exports= withdrawalsData

