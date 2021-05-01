const express = require('express');
const transfer = require('../controllers/initiateTransfer')

const router = express.Router();


router.post('/transfer',transfer);

module.exports = router;