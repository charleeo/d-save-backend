const models = require('../models/index')
const winston = require('winston')
const checkBalance= async(data)=>{
  let statusCode=0;
  // const allInvestments = await models.InvestmentRecords.findAll();
  // console.log(allInvestments)
  let error=''
  const userEmail = data.userEmail;
  const amount = data.amount;
  const userBalance = await models.InvestmentRecords.findOne({
    where:{userEmail}
    // attributes:['withdrawals','deposits','id','balance']
  });

  winston.info({"User Balance:":userBalance})

  if(!userBalance){
    error= "You don't have any deposit history to withdraw from";
    statusCode=400;
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


module.exports=checkBalance