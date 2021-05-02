const axios = require('axios');
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string')
// GET: https://sandbox.monnify.com/api/v2/disbursements/single/summary?reference={{reference}}
const transfer =async (req,res)=>{
  const reference = randomString(22)
  const {amount,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency} =req.body
  const data = {amount,reference,narration,destinationBankCode,destinationAccountNumber,sourceAccountNumber,currency}
  try {
    const response = await axios({
      url: 'v2/disbursements/single',
      method: 'post',
      headers: {
          Authorization: auth(),
      },
      data    
  });
  const details = await axios({
    url: `v2/disbursements/single/summary?reference=${response.data.responseBody.reference}`,
    method: 'get',
    headers: {
        Authorization: auth(),
    }, 
});
  if(details  && details.data.requestSuccessful===true){

    res.status(200).json({data:details.data})
  }else{res.status(400).json({data:'Deposit was not successful'})}
  } catch (error) {
    console.log(error)
    res.status(400).json({error:error.message})
  }
}

module.exports= transfer


