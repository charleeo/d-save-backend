const models = require('../models/index');
const Sequelize = require('sequelize')
async function getSavingsWithIDs(data){
  let error='';
  let statusCode = 0;
  
  const {id}= data.body
  const savingsWithIDs= await models.Saving.findAll(
   {
    where: {id: [id]}
   }
 )
 if(!savingsWithIDs){
   error='resource not found';
   statusCode=404
  }else{
    console.log(`This is the record `+savingsWithIDs)
    savingsWithIDs
  }
  return {
    statusCode,
    savingsWithIDs,
    error
  }
}
module.exports=getSavingsWithIDs