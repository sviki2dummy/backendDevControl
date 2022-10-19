let express = require('express');
let router = express.Router();

let loginUserAuthRouter = require('./subrouter/loginRouter');
router.use('/login', loginUserAuthRouter);

let registerUserAuthRouter = require('./subrouter/registerRouter');
router.use('/register', registerUserAuthRouter);

let logoutUserAuthRouter = require('./subrouter/logoutRouter');
router.use('/logout', logoutUserAuthRouter);

module.exports = router;