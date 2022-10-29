import { UsersDB } from "../../../firestoreDB/users/userDB";
import { ILogoutRequest } from "../../../models/API/loginRegisterReqRes";

var express = require('express');
var router = express.Router();

var userDBfile = require('../../../firestoreDB/users/userDB');
var userDB: UsersDB = userDBfile.getUserDBInstance();

router.get('/', async (req, res) => {
    let logoutRequest: ILogoutRequest = req.body;
    await userDB.removeToken(logoutRequest.authToken);
    res.sendStatus(200);
})

module.exports = router;