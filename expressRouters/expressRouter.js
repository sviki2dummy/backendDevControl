const express = require('express');
const router = express.Router();


const userAuthRouter = require('./userAuths/userAuthRouter');
router.use('/userAuth', userAuthRouter);

//add more use-s

module.exports = router;