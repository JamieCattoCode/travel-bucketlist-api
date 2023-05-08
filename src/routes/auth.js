const express = require('express');
const authController = require('../controllers/auth');
const registerController = require('../controllers/register');

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', authController.login);

module.exports = router;