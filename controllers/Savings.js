const Models = require("../models")
const winston = require('winston')
const fsPromises = require('fs').promises

async function receivePayment(req,res){
  const data = req.body;
  winston.info(data)
  await fsPromises.writeFile('file.txt', `${data}`)
}

module.exports= {receivePayment}