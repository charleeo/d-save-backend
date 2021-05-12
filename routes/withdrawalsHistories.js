const express = require('express');
const { withdrawalHistoryPerPrseon } =require('./../controllers/withdrawalsHistory');
const {checkAuth} = require('../middleware/check-auth');

const router = express.Router();


router.post('/history-per-person/:email',checkAuth, withdrawalHistoryPerPrseon);

module.exports = router;