const winston = require('winston')

const http = require('http');
const app = require('./app');
require('dotenv').config();
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, ()=>{
  winston.info(`Listening on port ${port}`)
});
const formatTimeStamp=(timeStamp)=>{
  return new Date(timeStamp)
}

let date = new Date();
let minLiquidationMonths = date.setUTCMonth(date.getUTCMonth()+5);
let minLiquidationWeeks = (date.getDate()+7);
var myDate = new Date().getTime()+(7*24*60*60*1000);
console.log(myDate)


winston.info(formatTimeStamp(minLiquidationMonths))

