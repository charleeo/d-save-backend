const axios = require('axios');
const auth =require('../middleware/monnify_configs')
const {randomString} = require('../helpers/random_string')
const reference = randomString(22)

const transfer =async (req,res)=>{
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
console.log(response.data)
 res.json(response.data)
} catch (error) {
  console.log(error)
  res.json(error)

}
  
}

module.exports= transfer


