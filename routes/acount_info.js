const express = require('express');
const GateWay =  require('../controllers/CreateRevservedAccountController');
const checkAuth = require('../middleware/check-auth')
const Savings = require('../controllers/Savings');

const router = express.Router()

router.post('/reserve-account', checkAuth.checkAuth,  GateWay.createAReserveAccount);

router.post('/savings',   Savings.receivePayment);

module.exports=router
