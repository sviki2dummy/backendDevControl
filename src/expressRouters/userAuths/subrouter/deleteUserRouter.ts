import { runInNewContext } from 'vm';
import { DeviceDB } from '../../../firestoreDB/devices/deviceDB';
import { UsersDB } from '../../../firestoreDB/users/userDB';
import { IDeleteUserRequest } from '../../../models/API/loginRegisterReqRes';

var express = require('express');
var router = express.Router();

var userDBfile = require('../../../firestoreDB/users/userDB');
var userDB: UsersDB = userDBfile.getUserDBInstance();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    const deleteReq: IDeleteUserRequest = req.body;
    let devices = await deviceDb.getDevices()
    let user = await userDB.getUserByToken(deleteReq.authToken, false);

    let isAdmin: boolean;
    devices.forEach(device => {
        if (device.userAdminId == user.id) isAdmin = true;
    })
    if (isAdmin) {
        res.status(400);
        res.send('User is admin');
        return;
    }
    let loginResponse = (await userDB.deleteUser(deleteReq.authToken));
    res.json(loginResponse);
});

module.exports = router;