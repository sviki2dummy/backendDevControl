var express = require('express');
var router = express.Router();

import { IRegisterRequest } from '../../../models/API/loginRegisterReqRes'
var userDB = require('../../../firestoreDB/users/userDB');

router.post('/q', (req, res) => {
    res.sendStatus(200);
    console.log(req);
    console.log(req.body);
    let registerReq: IRegisterRequest = req.body;
    console.log('registerrr')
    userDB.addUser(registerReq.username, registerReq.password);
    res.send('OKnwe');
})

router.get('/X', (req, res) => {
    res.send('hello');
})

router.get('/register', (req, res) => {
    let registerReq: IRegisterRequest = req.body;
    userDB.getAllUsers();
    res.send('OK');
})



module.exports = router;