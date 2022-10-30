import { DeviceDB } from 'firestoreDB/devices/deviceDB';
import { deviceDBSingletonFactory, usersDBSingletonFactory } from '../../../firestoreDB/singletonService';
import { UsersDB } from 'firestoreDB/users/userDB';
import { IDeleteUserRequest } from '../../../models/API/loginRegisterReqRes';

var express = require('express');
var router = express.Router();

var deviceDb: DeviceDB = deviceDBSingletonFactory.getInstance();
var userDb: UsersDB = usersDBSingletonFactory.getInstance();


router.post('/', async (req: any, res: any) => {

    const deleteReq: IDeleteUserRequest = req.body;
    let devices = await deviceDb.getDevices()
    let user = await userDb.getUserByToken(deleteReq.authToken, false);

    let isAdmin: boolean = false;
    devices.forEach(device => {
        if (device.userAdminId == user.id) isAdmin = true;
    });
    if (isAdmin) {
        res.status(400);
        res.send('User is admin');
        return;
    }
    let loginResponse = (await userDb.deleteUser(deleteReq.authToken));
    res.json(loginResponse);
});

module.exports = router;