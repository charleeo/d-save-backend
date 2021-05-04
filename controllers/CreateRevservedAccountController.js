const axios = require('axios')
const models = require('../models');
const authenticateGateWay = require('../middleware/authenticate_gateway')

const {randomString}= require('../helpers/random_string')
async function createAReserveAccount(req, res){
  try{
  let token = await authenticateGateWay();
 
  const config = {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
};

const userInfo = await models.User.findOne({where:{id:req.userData.userId}});


// Check if this user already has a reserved accoutn
const checkUserAccount = await models.reserved_account.findOne({where:{userId:userInfo.id}});

if(checkUserAccount){  return res.status(409).json({ error:"You can't have more than one reserved account"  })
}

const contractCode= process.env.MONNIFY_CONTRACT_CODE
const {
  accountName,customerBvn}=req.body; /** This is from input elements */
  const accountReference = randomString(20)
  const currencyCode="NGN"
  const getAllAvailableBanks=true;
/** Include the user details in the request body */
const bodyParams ={
  accountReference,accountName,currencyCode, contractCode,customerBvn,customerName:userInfo.name, customerEmail:userInfo.email,getAllAvailableBanks
}

/** Make axios call to the payment gateway to create the account for the loogin user */
  const  response= await axios.post( 
    `v2/bank-transfer/reserved-accounts`, bodyParams,config
   )

   /** destructure the callback response from the gateway and include them in the items to save */
   const {accounts, status,collectionChannel,reservationReference} = response.data.responseBody;
   
   const itemsToSave = {
     accountReference,accountName,currencyCode,contractCode,customerBvn,userId:userInfo.id,bankName:accounts.bankName,bankCode:accounts.bankCode,status, accountNumber:accounts.accountNumber,collectionChannel,reservationReference
    }
   /** Save the response to my database */
   const postData = new models.reserved_account(itemsToSave)
   await postData.save();
   return res.status(201).json({message:"Account created successfully",
   Result:itemsToSave})
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}
module.exports={ createAReserveAccount}
