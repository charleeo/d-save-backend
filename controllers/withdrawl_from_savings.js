const models = require('../models/index');
const Sequelize = require('sequelize')
async function getSavingsWithIDs(data){
  let error='';
  let statusCode = 0;
  
  let {investmentID}= data
   investmentID = investmentID.replace(/^'|'$/g, '');
  const savingsWithIDs= await models.Saving.findAll(
   {
    where: {id: [investmentID]}
   }
 )
 if(!savingsWithIDs){
   error='resource not found';
   statusCode=404
  }
  console.log(savingsWithIDs)
  return {
    statusCode,
    savingsWithIDs,
    error
  }
}
module.exports=getSavingsWithIDs