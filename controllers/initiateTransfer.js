  const axios = require('axios');
  const {withdrawInvestment} = require('./withdraw_from_investment_model');
  const  models  = require('../models/index');
  const checkBalance =require('./checkBalance');
  const auth =require('../middleware/monnify_configs')
  const {randomString} = require('../helpers/random_string');
  const withdrawalHistoryCreate=require('./withdrawalsOperations');
  const Sequelize = require('sequelize');
  const getSavingsWithIDs  = require('./withdrawl_from_savings');
  const winston = require('winston');
  const transfer =async (req,res)=>{
  const reference = randomString(22);
  const sourceAccountNumber='4353544245';
  const currency ="NGN";
  const {amount,narration,destinationBankCode,destinationAccountNumber,userEmail,investmentID,withdrawalCategory} =req.body;
  
  const data = {amount:parseInt(amount),reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail,investmentID}
  const balanceCheck= await checkBalance(data);//check the available balance before proceeding with the withdrawals
  const {withdrawals,error,newBalance,statusCode} = balanceCheck;
  
  try {
  if(!amount || !destinationBankCode || !destinationAccountNumber || !narration){
    //make sure they dont submit empty rquests or fields
    return res.status(400).json({error:"Check to make sure all fields are filled"})
  }
  if(amount < 500){
    return res.status(400).json({error:'Minimum amount you can withdraw is 500'})
  }
  if(narration.length <10)
  {
    return res.status(400).json({error:"Payament description can't be less than 10 characters"})
  }
  if(error !==''){return res.status(statusCode).json({error:error})}
  /** At this junction, check if the withdrawals request is for investment instance or for the savings instances */
  if(withdrawalCategory !=='' && withdrawalCategory==="savings-withdrawals"){
   const getSavingsWithID = await getSavingsWithIDs(data);
    const {savingsError,Code} = getSavingsWithID
    if(savingsError !==''){
      res.status(Code).json({error:savingsError})
    }
  }else{
    const investmentWithdraw = await withdrawInvestment(data);
    const {exception} = investmentWithdraw; //
    if(exception !==''){return res.status(200).json({error:exception})}
  }
    const response = await axios({
      url: 'v2/disbursements/single',
      method: 'post',
      headers: {
          Authorization: auth(),
      },
      data    
  });

  const details = await axios({
      url: `v2/disbursements/single/summary?reference=${response.data.responseBody.reference}`,
      method: 'get',
      headers: {
          Authorization: auth(),
        }, 
      });
      if(details  && details.data.requestSuccessful===true){
        //checking response status. if it is successful, then update the neccessary tables
        await models.InvestmentRecords.update({withdrawals,balance:newBalance},{where:{userEmail}});//update the generalinvestment records table
        
        if(withdrawalCategory !=='' && withdrawalCategory==="savings-withdrawals"){
          ids = investmentID.split(',')
          await models.Saving.update(
            {status:false},
            {where:{id:ids}}
            );
        }
        else{ //update the investment table
          await models.InvestmentsDetails.update(
            {status:false},
            {
              where: Sequelize.and(
                {id:investmentID},
                {customerEmail:userEmail} 
              )}
            );
        }
          const {amount,
            reference,
            narration,
            currency,
            fee,
            status,
            transactionDescription,
            transactionReference,
            createdOn,
            sourceAccountNumber,
            destinationAccountNumber,
            destinationAccountName,
            destinationBankCode,
            destinationBankName}= details.data.responseBody
            const withdrawalsData= {
            amount,
            reference,
            narration,
            currency,
            fee,
            status,
            transactionDescription,
            transactionReference,
            createdOn,
            sourceAccountNumber,
            destinationAccountNumber,
            destinationAccountName,
            destinationBankCode,
            destinationBankName, userEmail};
         await withdrawalHistoryCreate(withdrawalsData)
         return res.status(200).json({data:details.data})
      }else{
        return res.status(200).json({data:details.data})
      }
    } catch (error) {
      // console.log(error.response.data.responseMessage) 5000719969
     return res.json({error:error.response.data.responseMessage})
    }
}
module.exports= transfer


 