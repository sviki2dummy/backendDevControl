var express = require('express');
var router = express.Router();

import { usersDB } from '../../../firestoreDB/users/userDB';
import { IRegisterRequest } from '../../../models/API/loginRegisterReqRes'

var usersDBfile = require('../../../firestoreDB/users/userDB.ts')
var userDB: usersDB = usersDBfile.getUserDBInstance();

router.post('/', async (req, res) => {
    console.log(req.body);
    let registerReq: IRegisterRequest = req.body;
    let id;
    try {
        id = await userDB.addUser(registerReq.username, registerReq.password, registerReq.email);
        res.send(`${id}`);
    }
    catch (e) {
        console.log(e);
        
        res.send(e['message']);
    }
})



module.exports = router;