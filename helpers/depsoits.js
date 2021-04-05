const winston = require('winston');
const models = require('../models/index');

// function diff_months(dt2, dt1){
//  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
//  diff /= (60 * 60 * 24 * 30);
//  return Math.abs(Math.round(diff));
// }
const formatTimeStamp=(timeStamp)=>{
  return new Date(timeStamp)
}
const savingsObject= async(params)=>{
  const plans={bronze:5000,silver:25000};
   const {transactionHash,customer, transactionReference,paidOn,amountPaid,settlementAmount} =params;
   let date = new Date();
   let minLiquidationMonths = date.setUTCMonth(date.getUTCMonth()+6);
   let minLiquidationWeeks =  new Date().getTime()+(7*24*60*60*1000);//7 days added to current time/date
   let investmentDuration;
   let interestRate;
   let expectedInterest;
   let actualInterest;
   let liquidationPeriod;
   let liquidatedDate;
   let investmentCategory;

   let data={investmentDuration,interestRate,expectedInterest,actualInterest,    liquidatedDate, liquidationPeriod,cutomerEmail:customer.email,cutomerName:customer.name,investmentAmount:amountPaid, investmentCategory,transactionReference,paidOn,transactionHash,settlementAmount}
   data.liquidatedDate = formatTimeStamp(minLiquidationMonths)
  
   if(amountPaid <= plans.bronze){
    //  Do somethind for the savings table
    data.investmentDuration= formatTimeStamp(minLiquidationWeeks)
    data.interestRate=0;
    data.investmentCategory=1;
    data.liquidatedDate=formatTimeStamp(minLiquidationWeeks)
    const savingsItem= new models.Saving(data)
   return await savingsItem.save()
  }else{
  
   if(amountPaid > plans.bronze && amountPaid <= plans.silver){
      //  Investment category will be silver
      data.investmentCategory = 2;
      data.interestRate=10;
    }else if(amountPaid > plans.silver){
      //  Investment category will be gold
      data.investmentCategory = 3;
      data.interestRate=15;
    }
    data.investmentDuration= new Date(fourMonthsTime);
    const investItems = new models.Investment(data);
   return await investItems.save()
  }
}

module.exports = savingsObject