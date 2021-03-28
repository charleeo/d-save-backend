const models = require('../models/index');

const Savings=(params)=>{
   const {transactionHash, transactionReference,paidOn,amountPaid} =params
  if(amountPaid <= plans.savings){
    //  Do somethind for the savings table
  }else if(amountPaid > plans.savings  && amountPaid <=plans.bronze ){
    //  Investment category wil be bronze
  }else if(amountPaid > plans.bronze && amountPaid <= plans.silver){
    //  Investment category will be silver
  }else if(amountPaid > plans.silver){
    //  Investment category will be gold
  }
}

module.exports = Savings