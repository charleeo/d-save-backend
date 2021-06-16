const express = require('express');
const {getInvestmentsSummary} = require('../controllers/SavingsAndInvstments');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get("/summary", getInvestmentsSummary);

module.exports = router;
