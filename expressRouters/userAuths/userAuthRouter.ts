const express = require('express');
const router = express.Router();

const loginUserAuthRouter = require('./subrouter/loginRouter.ts');
router.use('/login', loginUserAuthRouter);

const registerUserAuthRouter = require('./subrouter/registerRouter.ts');
router.use('/register', registerUserAuthRouter);

const logoutUserAuthRouter = require('./subrouter/logoutRouter.ts');
router.use('/logout', logoutUserAuthRouter);

module.exports = router;

export { }