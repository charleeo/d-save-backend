const models = require("../models")

async function withdrawalHistoryCreate(data){
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
   const postData= {
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
   const newWithdrawals= new models.WithdrawalHistory(postData)
   return await newWithdrawals.save()
}


module.exports= withdrawalHistoryCreate

