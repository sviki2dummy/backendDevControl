var express = require('express');
var router = express.Router();

var loginUserAuthRouter = require('./subrouter/loginRouter.ts');
router.use('/login', loginUserAuthRouter);

var registerUserAuthRouter = require('./subrouter/registerRouter.ts');
router.use('/register', registerUserAuthRouter);

var logoutUserAuthRouter = require('./subrouter/logoutRouter.ts');
router.use('/logout', logoutUserAuthRouter);

var deleteUserAuthRouter = require('./subrouter/deleteUserRouter');
router.use('/delete', deleteUserAuthRouter);

module.exports = router;