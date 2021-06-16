const express = require('express');
const GateWay =  require('../controllers/CreateRevservedAccountController');
const {checkAuth} = require('../middleware/check-auth')
const receivePayment = require('../controllers/Savings');
const receiveCardPayment = require('../controllers/card-payment')

const router = express.Router()

router.post('/reserve-account', checkAuth,  GateWay.createAReserveAccount);

router.post('/savings',   receivePayment);
router.post('/card-payment', checkAuth, receiveCardPayment)

module.exports=router
