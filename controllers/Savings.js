const Models = require("../models")
const winston = require('winston')

const fs  = require('fs');

async function receivePayment(req,res){

const data = new Uint8Array(Buffer.from(req.body));
fs.writeFile('savings.txt', data, (err) => {
  if (err) throw err;
  winston.info('The file has been saved!');
});
}

module.exports= {receivePayment}