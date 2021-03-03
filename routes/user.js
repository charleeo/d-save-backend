const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', userController.signUp);
router.post('/login', userController.login);
router.get('/verify-account/:email/:token', userController.verifyEmail);
router.post('/resend/:email',userController.resendToken);

module.exports = router;