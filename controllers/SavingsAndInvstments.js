const models = require('../models')
const winston = require('winston')

const savings = async (req,res)=>{
  const allSavings = await models.Saving.findAll();
  if(allSavings.length >0)return res.status(200).json({message:allSavings})
  else res.status(200).json({message:"No record found"})
}

const investments = async (req,res)=>{
  const allInvestments = await models.InvestmentsDetails.findAll();
  if(allInvestments.length >0)return res.status(200).json({message:allInvestments})
  else return res.status(200).json({message:"No record found"})
}

const individualSavings= async(req,res)=>{
  const email = req.params.email
 const individualSaves = await models.Saving.findAll({where:{customerEmail:email}});
 if(individualSaves.length >0)return res.status(200).json({message:individualSaves});
 else return res.status(404).json({message:"No record found"})
}


const individualInvestments= async(req,res)=>{
  const email = req.params.email
 const individualInvests = await models.InvestmentsDetails.findAll({where:{customerEmail:email}});
 if(individualInvests.length >0)return res.status(200).json({message:individualInvests});
 else return res.status(404).json({message:"No record found"})
}

module.exports = {savings,investments,individualSavings,individualInvestments}