const axios = require('axios');
const withdrawInvestment = require('./withdraw_from_investment_model');
const  models  = require('../models/index');
const checkBalance =require('./checkBalance');
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string');


const transfer =async (req,res)=>{
  const reference = randomString(22);
  const sourceAccountNumber='4353544245';
  const currency ="NGN";
  const {amount,narration,destinationBankCode,destinationAccountNumber,userEmail,investmentID} =req.body;
  const data = {amount:parseInt(amount),reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail,investmentID}
 
  const balanceCheck= await checkBalance(data);//check the available balance before proceeding with the withdrawals
  const {withdrawals,error,newBalance,statusCode} = balanceCheck;
  const investmentWithdraw = withdrawInvestment(data);
  const {exception,result} = investmentWithdraw;
  
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
    return res.status(400).json({error:"Payament description can't be less than 5 characters"})
  }
  if(error !==''){return res.status(statusCode).json({error:error})}
  if(exception !==''){return res.status(200).json({error:exception})}
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
      if(details  && details.data.requestSuccessful===true){//checking response status
        await models.InvestmentRecords.update({withdrawals,balance:newBalance},{where:{userEmail}});
    
         return res.status(200).json({data:details.data})
      }else{
        
        return res.json({data:details.data})
      }
    } catch (error) {
      // console.log(error.response.data.responseMessage) 5000719969
     return res.json({error:error.response.data.responseMessage})
    }
}
module.exports= transfer


