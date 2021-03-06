const models = require('../models/index');
const Sequelize = require('sequelize')
const withdrawInvestment=async(data)=>{
  let exception=''
 const {userEmail,investmentID,amount} = data; 
  const result = await models.InvestmentsDetails.findOne({
    where: Sequelize.and(      
    {id:investmentID},
    {customerEmail:userEmail} 
    )
  });
  if(!result){
    exception="The requested resources is not found";
  }
  else{
    if(result.status ===false){
      exception="Your are snitching. Trying to run a double transaction on one ivestment instance"
    }
    let totalAmount =parseInt(result.investmentAmount) + parseInt(result.actualInterest)
    if(parseInt(amount) > totalAmount){
      exception = `You are attempting to withdraw above your current investment of ${totalAmount} on this row`
    }
  }
  return  {result,exception}
}
const singleInvestment= async(req,res)=>{
    const {id,email} = req.params;
    const response = await models.InvestmentsDetails.findOne({
      where: Sequelize.and(      
      {id},
      {customerEmail:email} 
      )
    });
    if(!response)return res.status(404).json({error:"No records"});
    else return res.status(200).json({message:response})
}
module.exports={withdrawInvestment,singleInvestment};


function name(params) {
  
  //ensure the account details suppplied are valid
  // const validateAccountNumber = await axios({
  //   url: `v1/disbursements/account/validate?accountNumber=${destinationAccountNumber}&bankCode=${destinationBankCode}`,
  //   method:'get',
  // });
  // if(validateAccountNumber.requestSuccessful !==true && validateAccountNumber.responseMessage !=='success'){
  //   return res.status(400).json({error:`The account number ${destinationAccountNumber} does not match with the bankcode ${destinationBankCode}. Please try again`})
  // }
}

