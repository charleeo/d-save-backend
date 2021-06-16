const express = require('express');
const getBanksCode= require('../controllers/get_banks_code')
const router = express.Router()

router.get('/',   getBanksCode);

module.exports=router
