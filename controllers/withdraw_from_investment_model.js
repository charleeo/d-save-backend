const models = require('../models/index');
const Sequelze = require('sequelize')
const withDrawInvestment=async(data)=>{
  let exception=''
 const {userEmail,investmentID} = data;
 console.log(data)
  const result = await models.Investment.findOne({
    where: Sequelize.and(      
    {id:investmentID},
    {customerEmail:userEmail} 
    )
  })
  if(!result){
    exception="The requested resources is not found";
  }
  console.log(`Result from ivestment ${result}`)
  return  {result,exception}
}
module.exports=withDrawInvestment

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

