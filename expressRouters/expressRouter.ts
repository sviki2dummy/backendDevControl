let express = require('express');
let router = express.Router();

let userAuthRouter = require('./userAuths/userAuthRouter');
router.use('/userAuth', userAuthRouter);

//add more use-s

module.exports = router;

export { }