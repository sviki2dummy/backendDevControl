const express = require('express');
const router = express.Router();

const loginUserAuthRouter = require('./subrouter/loginRouter');
router.use('/login', loginUserAuthRouter);

const registerUserAuthRouter = require('./subrouter/registerRouter');
router.use('/register', registerUserAuthRouter);

const logoutUserAuthRouter = require('./subrouter/logoutRouter');
router.use('/logout', logoutUserAuthRouter);

module.exports = router;