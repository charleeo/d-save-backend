const express = require('express');
const {savings, investments, individualSavings, individualInvestments} = require('../controllers/SavingsAndInvstments');
const {checkAuth} = require('../middleware/check-auth');

const router = express.Router();


router.get('/all-savings',savings);
router.get('/all-investments',investments);
router.get('/individual-savings/:email', checkAuth,individualSavings);
router.get('/individual-investments/:email', checkAuth,individualInvestments)
module.exports = router;