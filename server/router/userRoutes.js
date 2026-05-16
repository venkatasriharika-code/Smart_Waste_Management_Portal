const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const {userRegister,userLogin} = authController;


router.post('/register',userRegister);
router.post('/login',userLogin);

module.exports = router;