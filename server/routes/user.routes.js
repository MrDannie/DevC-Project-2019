const express = require('express');
const userControl = require('../controller/user');

const router = express.Router();

router.post('/v1/auth/create-user', userControl.createAccount);
router.post('/v1/auth/signin', userControl.signIn);
router.get('/v1/users', userControl.getUsers);

module.exports = router