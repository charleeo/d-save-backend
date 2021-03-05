const Models = require("../models")
const winston = require('winston')
const fsPromises = require('fs').promises

async function receivePayment(req,res){
  const data = req.body;
  winston.info({data})
  winston.info({AccountPayments:data.accountPayments})
  // `${clientSecret}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`
  // await fsPromises.writeFile('file.txt', `${data}`)
}
// 3000023360 

module.exports= {receivePayment}