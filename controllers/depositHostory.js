const depositHistory = (data)=>{
  const dataToSave = { 
    transactionReference:data.transactionReference  ,
    paymentReference:data.paymentReference ,
    amountPaid: data.amountPaid,
    totalPayable :data.totalPayable,
    settlementAmount:data.settlementAmount,
    paidOn:data.paidOn ,
    paymentStatus:data.paymentStatus,
    paymentDescription:data.paymentDescription,
    currency:data.currency,
    paymentMethod:data.paymentMethod ,
    product:`${data.product.type}, ${data.product.reference}`,
    cardDetails:data.cardDetails, 
    accountDetails:data.accountDetails.accountNumber,
    accountPayments:data.accountPayments.accountName,
    customerEmail:data.customer.email,
    customerName:data.customer.name,
    transactionHash:data.transactionHash,
    amountPaid:data.amountPaid
  }
  return dataToSave;
}

module.exports= depositHistory