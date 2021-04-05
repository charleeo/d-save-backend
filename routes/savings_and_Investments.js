const express = require('express');
const {savings, investments} = require('../controllers/SavingsAndInvstments')

const router = express.Router();


router.get('/all-savings',savings);
router.get('/all-investments',investments);

module.exports = router;