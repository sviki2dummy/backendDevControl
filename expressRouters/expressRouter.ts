var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var userAuthRouter = require('./userAuths/userAuthRouter.ts');
router.use(bodyParser.urlencoded({extended: false}));
router.use('/userAuth', userAuthRouter);

//add more use-s

module.exports = router;