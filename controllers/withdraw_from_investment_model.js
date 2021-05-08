const models = require('../models/index');
const {Op} = require('sequelize')

const withDrawInvestment=async(data)=>{
  console.log(data)
  let exception=''
 const {userEmail,investmentID} = data;
 console.log(investmentID)
  const result = await models.Investment.findOne({
    where:{
      [Op.and]:[
      { id:investmentID},
      {userEmail:userEmail}
      ]
    }
  })
  if(!result){
    exception="The requested resources is not found";
  }
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

