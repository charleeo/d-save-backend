const express = require('express');
const {savings, investments, individualSavings, individualInvestments} = require('../controllers/SavingsAndInvstments');
const {checkAuth} = require('../middleware/check-auth');

const router = express.Router();


router.get('/all-savings',savings);
router.get('/all-investments',investments);
router.get('/individual-savings', checkAuth,individualSavings);
router.get('/individual-investments', checkAuth,individualInvestments)
module.exports = router;