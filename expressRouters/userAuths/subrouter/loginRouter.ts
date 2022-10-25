var express = require('express');
var router = express.Router();
import { usersDB } from '../../../firestoreDB/users/userDB';
import { ILoginRequest } from '../../../models/API/loginRegisterReqRes'
var userDBfile = require('../../../firestoreDB/users/userDB');
var userDB: usersDB = userDBfile.getUserDBInstance();


router.post('/', async (req, res) => {
    const loginReq: ILoginRequest = req.body;
    let id = (await userDB.getUserbyCreds(loginReq.username, loginReq.password)).id;
    res.send(`${id}`);
});

module.exports = router;