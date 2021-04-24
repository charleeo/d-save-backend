const express = require('express');
const forAPI = require('../controllers/getVar')
const router = express.Router();

 router.get('/api',forAPI);

module.exports = router;