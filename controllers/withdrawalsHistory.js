const models = require('../models/index');
const Sequelize = require('sequelize')

 const withdrawalHistoryPerPrseon=(req,res)=>{
  const email = req.params.email;
  const history = models.WithdrawalHistory.findAll({where:{userEmail:email}});
  if(!history)return res.status(404).json({error:"No record found"});
  res.status(200).json({message:history})
}

module.exports={withdrawalHistoryPerPrseon}