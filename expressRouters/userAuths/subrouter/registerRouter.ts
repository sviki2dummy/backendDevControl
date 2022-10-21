var express = require('express');
var router = express.Router();

import { IRegisterRequest } from '../../../models/API/loginRegisterReqRes'
var userDB = require('../../../firestoreDB/users/userDB');

router.post('/', async (req, res) => {
    console.log(req.body);
    let registerReq: IRegisterRequest = req.body;
    console.log('registerrr')
    let id = await userDB.addUser(registerReq.username, registerReq.password, registerReq.email);
    if(id === -1){
        res.send('User not created');
    }
    else{
        res.send('User created: ' + id);
    }
})



module.exports = router;