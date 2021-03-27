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

const createHash= async(body,key)=>{
  const {transactionReference,amountPaid,paymentReference,paidOn}=body;
  const text=`${key}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`;
  const hash = crypto.createHash('sha512',key).update(text).digest('hex');
  const hashed = Buffer.from(hash)
  return hashed;
}

module.exports= {depositHistory,createHash}