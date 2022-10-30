import { deviceDBSingletonFactory, usersDBSingletonFactory } from "../../../firestoreDB/singletonService";
import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IChangeDeviceAdminReq } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDb: DeviceDB = deviceDBSingletonFactory.getInstance();
var userDb: UsersDB = usersDBSingletonFactory.getInstance();

router.post('/', async (req: any, res: any) => {

    var changeDeviceAdminReq: IChangeDeviceAdminReq = req.body;
    try {
        await userDb.getUserByToken(changeDeviceAdminReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    try {
        await userDb.getUserbyId(changeDeviceAdminReq.userAdminId);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    try {
        await deviceDb.changeDeviceAdmin(changeDeviceAdminReq.deviceId, changeDeviceAdminReq.userAdminId);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }
    res.sendStatus(200);
});

module.exports = router;
