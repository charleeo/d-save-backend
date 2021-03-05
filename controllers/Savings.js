const Models = require("../models")
const winston = require('winston')
const fsPromises = require('fs').promises
const crypto = require('crypto');
const { string } = require("joi");

async function receivePayment(req,res){
  const data = req.body;
  // winston.info({data})
  winston.info({AccountPayments:data.transactionHash})

  const paymentReference = data.paymentReference
  const transactionReference= data.transactionReference
  const amountPaid = data.amountPaid
  const paidOn = data.paidOn
  const clientSecret = process.env.MONNIFY_SECRET_KEY
  const stringValue=`${clientSecret}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`
  // await fsPromises.writeFile('file.txt', `${data}`)
    key = process.env.MONNIFY_SECRET_KEY

// create hahs
const hash = crypto.createHmac('sha512', key)
hash.update(stringValue)
const value = hash.digest('hex')
winston.info(value)

}
// 3000023360 

module.exports= {receivePayment}