const express = require('express');
const router = express.Router();


const userAuthRouter = require('./userAuths/userAuthRouter.ts');
router.use('/userAuth', userAuthRouter);

//add more use-s

module.exports = router;

export { }
