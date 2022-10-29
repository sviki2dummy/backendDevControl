import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IRemoveDeviceFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();

router.post('/', async (req, res) => {
    var removeDeviceGroupFieldReq: IRemoveDeviceFieldGroup = req.body;

    let user: IUser;
    try {
        user = await userDb.getUserByToken(removeDeviceGroupFieldReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    let device: IDevice;
    try {
        device = await deviceDb.getDevicebyId(removeDeviceGroupFieldReq.deviceId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    try {
        deviceDb.getDeviceFieldGroup(device, removeDeviceGroupFieldReq.groupId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    if (device.userAdminId != user.id) {
        res.status(400);
        res.send('User isn\'t admin');
        return;
    }
    
    try {
        await deviceDb.removeDeviceFieldGroup(removeDeviceGroupFieldReq.deviceId, removeDeviceGroupFieldReq.groupId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }
    res.sendStatus(200);
});

module.exports = router;
