const models = require('../models');

const reservedAccounts = async(req,res)=>{
  const allAcounts = await models.reserved_account.findAll();
  if(allAcounts.length !==[''])return res.status(200).json(allAcounts)
  return res.status(200).json({message:"No reserved account at the moment"})
}


const reservedAccount = async(req,res)=>{
const id = req.params.id
  const myAccount = await models.reserved_account.findOne({where:{userId:id}});
  console.log(myAccount)
  if(myAccount.length !==[''])return res.status(200).json({data:myAccount}) 
  return res.status(200).json({message:"No reserved account at the moment"})
}

module.exports={reservedAccounts,reservedAccount}