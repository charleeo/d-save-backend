require('dotenv').config()
const forAPI=(req,res)=>{
  const apiVars = {key:process.env.REACT_APP_MONNIFY_SECRET_KEY,contract:process.env.REACT_APP_MONNIFY_CONTRACT_CODE}
  console.log(apiVars)
 return  res.json({res:apiVars})
}

module.exports = forAPI;