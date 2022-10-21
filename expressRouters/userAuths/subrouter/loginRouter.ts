var express = require('express');
var router = express.Router();
import { ILoginRequest } from '../../../models/API/loginRegisterReqRes'
var userDB = require('../../../firestoreDB/users/userDB');


router.post('/', async (req, res) => {
    const loginReq: ILoginRequest = req.body;
    let id = await userDB.getUserbyCreds(loginReq.username, loginReq.password);
    res.send(''+id);
});

module.exports = router;