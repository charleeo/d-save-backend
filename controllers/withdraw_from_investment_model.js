const models = require('../models/index');
const Sequelize = require('sequelize')
const withDrawInvestment=async(data)=>{
  let exception=''
 const {userEmail,investmentID,amount} = data; 
  const result = await models.InvestmentsDetails.findOne({
    where: Sequelize.and(      
    {id:investmentID},
    {customerEmail:userEmail} 
    )
  })
  if(!result){
    exception="The requested resources is not found";
  }else if(parseInt(amount) > parseInt(result.investmentAmount)){
    exception = `You are attempting to withdraw above your current investment of ${result.investmentAmount} on this row`
  }
  return  {result,exception}
}
const singleInvestment= async(req,res)=>{
    const {investmentID,email} = req.params;
    const data ={investmentID,email}
    const{exception,result}= await withDrawInvestment(data);
    if(exception !=='')return res.status(404).json({error:exception});
    else return res.status(200).json({message:result})
}
module.exports={withDrawInvestment,singleInvestment};


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

