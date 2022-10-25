var express = require('express');
var router = express.Router();

import { usersDB } from '../../../firestoreDB/users/userDB';
import { IRegisterRequest } from '../../../models/API/loginRegisterReqRes'
var userDB: usersDB = require('../../../firestoreDB/users/userDB');

router.post('/', async (req, res) => {
    console.log(req.body);
    let registerReq: IRegisterRequest = req.body;
    let id;
    try {
        id = await userDB.addUser(registerReq.username, registerReq.password, registerReq.email);
        res.send(`${id}`);
    }
    catch (e) {
        res.send(e['message']);
    }
})



module.exports = router;