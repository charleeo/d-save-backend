const axios = require('axios');
const  models  = require('../models/index');
const checkBalance =require('./checkBalance')
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string');


const transfer =async (req,res)=>{
  const reference = randomString(22);
  const sourceAccountNumber='4353544245';
  const currency ="NGN";
  const {amount,narration,destinationBankCode,destinationAccountNumber,userEmail} =req.body
  const data = {amount:parseInt(amount),reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail}
 
  const balanceCheck= await checkBalance(data);//check the available balance before proceeding with the withdrawals
  const {withdrawals,error,newBalance,statusCode} = balanceCheck;

  try {
  if(!amount || !destinationBankCode || !destinationAccountNumber || !narration){
    return res.status(400).json({error:"Check to make sure all fields are filled"})
  }
  if(amount < 500){
    return res.status(400).json({error:'Minimum amount you can withdraw is 500'})
  }
  if(narration.length < 5)
  {
    return res.status(400).json({error:"Payament description can't be less than 5 characters"})
  }
  if(error !==''){return res.status(statusCode).json({error:error})}
//ensure the account details suppplied are valid
  const validateAccountNumber = await axios({
    url: `v1/disbursements/account/validate?accountNumber=${destinationAccountNumber}&bankCode=${destinationBankCode}`,
    method:'get',
  });
  // if(validateAccountNumber.requestSuccessful !==true && validateAccountNumber.responseMessage !=='success'){
  //   return res.status(400).json({error:`The account number ${destinationAccountNumber} does not match with the bankcode ${destinationBankCode}. Please try again`})
  // }
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
