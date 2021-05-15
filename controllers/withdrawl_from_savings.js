const models = require('../models/index');
const Sequelize = require('sequelize')
async function getSavingsWithIDs(data){
  let savingsError='';
  let Code = 0;
  
  let {investmentID}= data
  ids = investmentID.split(',')
  const savingsWithIDs= await models.Saving.findAll(
   {
    where: {id: ids}
   }
 )
 if(!savingsWithIDs){
   savingsError='resource not found';
   Code=404
  }else{
    savingsWithIDs.map(saves=>{
      if(saves.status ===false){
        savingsError = "You are snitching. Trying to withdraw the same fund twice";
        Code=400;
      }
    })
  }
  
  return {
    Code,
    savingsError
  }
}
module.exports=getSavingsWithIDs