import { UsersDB } from '../../../firestoreDB/users/userDB';
import { ILoginByTokenRequest, ILoginRequest, ILoginResponse } from '../../../models/API/loginRegisterReqRes'

var express = require('express');
var router = express.Router();

var userDBfile = require('../../../firestoreDB/users/userDB');
var userDB: UsersDB = userDBfile.getUserDBInstance();

router.post('/creds', async (req, res) => {
    const loginReq: ILoginRequest = req.body;

    let loginResponse: ILoginResponse;
    try {
        loginResponse = await userDB.loginUserByCreds(loginReq.username, loginReq.password);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }
    res.json(loginResponse);
});

router.post('/token', async (req, res) => {
    const loginReq: ILoginByTokenRequest = req.body;

    let loginResponse = {} as ILoginResponse;
    try {
        const user = await userDB.getUserByToken(loginReq.authToken, true);
        loginResponse.user = user;
        loginResponse.authToken = loginReq.authToken;
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }
    res.json(loginResponse);
});

module.exports = router;