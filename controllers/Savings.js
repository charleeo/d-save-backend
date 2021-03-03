const Models = require("../models")
const winston = require('winston')

async function receivePayment(req,res){
  winston.info(req.body)
}

module.exports= {receivePayment}