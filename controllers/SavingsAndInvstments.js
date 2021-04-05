const models = require('../models')
const winston = require('winston')

const savings = async (req,res)=>{
  const allSavings = await models.Saving.findAll();
  if(allSavings !== [])return res.status(200).json({Savings:allSavings})
  else res.status(202).json("No record found")
}

const investments = async (req,res)=>{
  const allInvestments = await models.InvestmentsDetails.findAll();
  if(allInvestments.length !== '')return res.status(200).json({Investments:allInvestments})
  else return res.status(202).json("No record found")
}

module.exports = {savings,investments}