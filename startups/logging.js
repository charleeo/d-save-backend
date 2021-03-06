require('express-async-errors');
const winston = require('winston');

module.exports = function()
{
 
winston.exceptions.handle(
  new winston.transports.Console({
    colorize:true, prettyPrint:true
  }),
  new winston.transports.File({filename:'uncaughtexceptions.log'}));

process.on('unhandledRejection', (ex)=>{
  winston.error(ex.message,ex)
  process.exit(1)
});

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
// winston.add(new winston.transports.mongoDB, { db:'mongodb://localhost/rentals' })

}