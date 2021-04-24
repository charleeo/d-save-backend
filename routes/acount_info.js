const express = require('express');
const checkAuth = require('../middleware/check-auth')
const {reservedAccount, reservedAccounts} = require('../controllers/ReservedAccount');


const router = express.Router()

router.get('/accounts-all',reservedAccounts);
router.get('/account-details/:id',reservedAccount)

module.exports=router
