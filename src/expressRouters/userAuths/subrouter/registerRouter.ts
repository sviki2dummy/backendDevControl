import { UsersDB } from '../../../firestoreDB/users/userDB';
import { IRegisterRequest } from '../../../models/API/loginRegisterReqRes'

var express = require('express');
var router = express.Router();

var usersDBfile = require('../../../firestoreDB/users/userDB.ts')
var userDB: UsersDB = usersDBfile.getUserDBInstance();

router.post('/', async (req: any, res: any) => {
    console.log(req.body);
    let registerReq: IRegisterRequest = req.body;
    try {
        await userDB.addUser(registerReq.username, registerReq.password, registerReq.email);
        let loginResponse = (await userDB.loginUserByCreds(registerReq.username, registerReq.password));
        res.json(loginResponse);
    }
    catch (e) {
        console.log(e);
        res.send(e['message']);
    }
})



module.exports = router;