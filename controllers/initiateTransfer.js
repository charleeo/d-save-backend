const axios = require('axios');
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string');
const  models  = require('../models/index');

const checkBalance= async(data)=>{
  let statusCode=0;
  let error=''
  const userEmail = data.userEmail;
  const amount = data.amount
  const userBalance = await models.InvestmentRecords.findOne({where:{userEmail}});

  if(!userBalance){
    error= "You don't have any deposit history to withdraw from";
    statusCode=404;
    balance= 0;
    withdrawalsBalance=0;
  }else{
    withdrawalsBalance = userBalance.withdrawals;
    balance = userBalance.balance;
    if(balance < amount){
      error=`Your current balance of ${balance} is lower than requested amount of ${amount}`;
      statusCode=400;
    }
  }
  //deduct the amount requested from the current balance
  const  newBalance = parseInt(balance) - parseInt(amount);
  const withdrawals = parseInt(withdrawalsBalance) + parseInt(amount)  
  return {newBalance,withdrawals,error,statusCode}; 
}

const transfer =async (req,res)=>{
  const reference = randomString(22);
  const sourceAccountNumber='4353544245';
  const currency ="NGN";
  const {amount,narration,destinationBankCode,destinationAccountNumber,userEmail} =req.body
  const data = {amount:parseInt(amount),reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail}
  const balanceCheck= await checkBalance(data);
  const {withdrawals,error,newBalance,statusCode} = balanceCheck
  try {
  if(error !==''){return res.status(statusCode).json({error:error})}

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
        console.log(details)
        return res.json({data:details.data})
      }
    } catch (error) {
      console.log(error.response.responseMessage)
     return res.json({error:error})
    }
}
module.exports= transfer
