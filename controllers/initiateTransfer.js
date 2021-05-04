const axios = require('axios');
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string');
const  models  = require('../models/index');

const checkBalance= async(data)=>{
  let error=''
  const userEmail = data.userEmail;
  const amount = data.amount
  const userBalance = await models.InvestmentRecords.findOne({where:{userEmail}});
  console.log(userBalance)
  if(!userBalance){
    error= "You don't have any deposit history to withdraw from";
  }
  else{
    const balance = userBalance.balance;
    if(balance < amount){
      error=`Your current balance of ${balance} is lower than requested amount of ${amount}`;
    }else{
      //deduct the amount requested from the current balance
     const  newBalance = parseInt(balance)- parseInt(amount);
     const withdrawals = parseInt(balance) + parseInt(amount)
     return {newBalance,withdrawals,error}
    }
  }
}

const transfer =async (req,res)=>{
  const reference = randomString(22)
  const {amount,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail} =req.body
  const data = {amount,reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency,userEmail}
  const balanceCheck= await checkBalance(data);
  const {withdrawals,error,newBalance} = balanceCheck
  if(error !==''){return res.json({error:error})}
  
  else{ try {
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
        console.log("Succcccccccccccccccccccccc")
        await models.InvestmentRecords.update({withdrawals,balance:newBalance},{where:{userEmail}});
    
         return res.status(200).json({data:details.data})
      }else{res.status(400).json({data:'Withdrawals was not successful'})}
    } catch (error) {
      console.log(error)
     return res.status(error.status).json({error:error.message})
    }
  }
}

module.exports= transfer


