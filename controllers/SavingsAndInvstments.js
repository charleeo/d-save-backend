const models = require('../models')
const Sequelize = require('sequelize');


const savings = async (req,res)=>{
  const allSavings = await models.Saving.findAll();
  if(allSavings.length >0)return res.status(200).json({message:allSavings})
  else return res.status(200).json({message:"No record found"})
}

const investments = async (req,res)=>{
  const allDeposits = await models.DepositHistory.findAll();
  if(allDeposits.length >0)return res.status(200).json({message:allDeposits});
  else return res.status(200).json({message:"No record found"})
}

const individualSavings= async(req,res)=>{
 const email = req.params.email
 const individualSaves = await models.Saving.findAll({where:{customerEmail:email}});
 if(individualSaves.length >0){
  return res.status(200).json({
   message:individualSaves
  });
 }
 else return res.status(200).json({message:"No record found"})
}

const individualInvestments= async(req,res)=>{
  const email = req.params.email
 const individualInvests = await models.InvestmentsDetails.findAll({
   where:Sequelize.and(
     {customerEmail:email},
     {status:true}
   )
  });
 if(individualInvests.length >0){return res.status(200).json({
   message:individualInvests
});}
 else return res.status(200).json({message:"No record found"})
}

const getInvestmentsSummary = async(req,res)=>{
  const summary = await models.InvestmentRecords.findAll();
  if(summary) return res.status(200).json({message:summary});
  else return res.status(200).json({message:"No record found for investment summary"})
}

async function getSavingsWithIDs(req,res){
  const id= req.body.id
 const savingsWithIDs= await models.Saving.findAll(
   {
    where: {id: [id]}
   }
 )
 if(!savingsWithIDs)return res.status(404).json({error:'resource not found'})
 console.log(`This is the record`+savingsWithIDs)
  return res.status(200).json({message:savingsWithIDs})
}
// 5000730073 
module.exports = 
{
  savings,
  investments,
  individualSavings,
  individualInvestments,
  getInvestmentsSummary,
  getSavingsWithIDs
}