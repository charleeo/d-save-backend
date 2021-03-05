const Models = require("../models")
const winston = require('winston')
fs = require('fs')

async function receivePayment(req,res){
 const responseBody= req.body
 fs.writeFile('response.json', responseBody, function (err) {
  if (err) throw err;
  winston.info('It\'s saved!');
});
}

module.exports= {receivePayment}