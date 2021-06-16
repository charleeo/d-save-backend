const express = require('express');
const transfer = require('../controllers/initiateTransfer')
const {checkAuth} = require('../middleware/check-auth')
const router = express.Router();


router.post('/transfer',checkAuth, transfer);

module.exports = router;