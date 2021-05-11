const express = require('express');
const {savings, investments, individualSavings, individualInvestments} = require('../controllers/SavingsAndInvstments');
const { singleInvestment } = require('../controllers/withdraw_from_investment_model');
const {checkAuth} = require('../middleware/check-auth');

const router = express.Router();

router.get('/all-savings',savings);
router.get('/all-investments',investments);
router.get('/individual-savings/:email', checkAuth,individualSavings);
router.get('/individual-investments/:email', checkAuth,individualInvestments);
router.get('/single-investment/:id/:email', singleInvestment)
module.exports = router;

