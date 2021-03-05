const Models = require("../models")
const winston = require('winston')
const fsPromises = require('fs').promises

async function receivePayment(req,res){
  const data = req.body;
  winston.info({AccountDetails:data.accountDetails})
  winston.info({AccountPayments:data.accountPayments})
  await fsPromises.writeFile('file.txt', `${data}`)
}
3000023360 

module.exports= {receivePayment}