const express = require('express');
const {signUp,login,verifyEmail,resendToken,allUser, userDetails,sendPasswordEmail} = require('../controllers/UserController');

const router = express.Router();

router.post('/register', signUp);
router.post('/login', login);
router.get('/verify-account/:email/:token', verifyEmail);
router.post('/resend/:email',resendToken);
router.get('/all',allUser);
router.get('/details/:id',userDetails)
router.post('/resend-password/link',sendPasswordEmail)

module.exports = router;