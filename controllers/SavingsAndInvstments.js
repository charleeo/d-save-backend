const models = require('../models')

const savings = async (req,res)=>{
  const allSavings = await models.Saving.findAll();
  if(allSavings.length >0)return res.status(200).json({message:allSavings})
  else return res.status(200).json({error:"No record found"})
}

const investments = async (req,res)=>{
  const allInvestments = await models.DepositHistory.findAll();
  if(allInvestments.length >0)return res.status(200).json({message:allInvestments});
  else return res.status(404).json({error:"No record found"})
}

const individualSavings= async(req,res)=>{
 const email = req.params.email
 const individualSaves = await models.Saving.findAll({where:{customerEmail:email}});
 if(individualSaves.length >0)return res.status(200).json({message:individualSaves});
 else return res.status(404).json({error:"No record found for individual savings"})
}

const individualInvestments= async(req,res)=>{
  const email = req.params.email
 const individualInvests = await models.InvestmentsDetails.findAll({where:{customerEmail:email}});
 if(individualInvests.length >0)return res.status(200).json({message:individualInvests});
 else return res.status(404).json({error:"No record found for individual investment"})
}

const getInvestmentsSummary = async(req,res)=>{
  const summary = await models.InvestmentRecords.findAll();
  if(summary) return res.status(200).json({message:summary});
  else return res.status(404).json({error:"No record found for investment summary"})
}
// 5000730073 
module.exports = 
{
  savings,
  investments,
  individualSavings,
  individualInvestments,
  getInvestmentsSummary
}