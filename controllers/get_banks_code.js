const axios = require('axios')
const authenticateGateWay = require('../middleware/authenticate_gateway')
 /** Get banks code for withdrawals purpose */
async function getBanksCode(req, res){
  try{
  let token = await authenticateGateWay();
  const config = {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
};
  const  response= await axios.get( 
    `v1/sdk/transactions/banks`, {},config
   )
   return res.status(201).json({message:response.data})
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
module.exports=getBanksCode

// https://sandbox.monnify.com/api/v1/sdk/transactions/banks
