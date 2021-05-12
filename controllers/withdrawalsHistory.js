const models = require('../models/index');
const Sequelize = require('sequelize')

 const withdrawalHistoryPerPrseon= async(req,res)=>{
  const email = req.params.email;
  const history = await models.WithdrawalHistory.findAll({where:{userEmail:email}});
  console.log(`This is the history ${history}`)
  if(!history)return res.status(404).json({error:"No record found"});
  else return res.status(200).json({message:history})
}

module.exports=withdrawalHistoryPerPrseon