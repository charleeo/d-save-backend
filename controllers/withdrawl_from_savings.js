const models = require('../models/index');
const Sequelize = require('sequelize')
async function getSavingsWithIDs(data){
  let error='';
  let statusCode = 0;
  
  // let {investmentID}= data
  // console.log(investmentID.split([]))
  let  investmentID = ["34","4","14"]
  //  console.log(investmentID)
  const savingsWithIDs= await models.Saving.findAll(
   {
    where: {id: investmentID}
   }
 )
 if(!savingsWithIDs){
   error='resource not found';
   statusCode=404
  }
  console.log(savingsWithIDs.length)
  return {
    statusCode,
    savingsWithIDs,
    error
  }
}
module.exports=getSavingsWithIDs