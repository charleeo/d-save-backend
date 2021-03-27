const express = require('express');
const GateWay =  require('../controllers/CreateRevservedAccountController');
const checkAuth = require('../middleware/check-auth')
const receivePayment = require('../controllers/Savings');

const router = express.Router()

router.post('/reserve-account', checkAuth.checkAuth,  GateWay.createAReserveAccount);

router.post('/savings',   receivePayment);

module.exports=router
