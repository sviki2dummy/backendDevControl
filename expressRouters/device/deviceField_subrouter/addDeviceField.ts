import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IAddDevice, IAddDeviceField, IAddDeviceFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IFieldGroup, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();

router.post('/', async (req, res) => {
    var addDeviceFieldReq: IAddDeviceField = req.body;

    let user: IUser;
    try {
        user = await userDb.getUserByToken(addDeviceFieldReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    let device: IDevice;
    try {
        device = await deviceDb.getDevicebyId(addDeviceFieldReq.deviceId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    let fieldGroup: IFieldGroup;
    try {
        fieldGroup = deviceDb.getDeviceFieldGroup(device, addDeviceFieldReq.groupId);
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


    let id = await deviceDb.addDeviceField(addDeviceFieldReq.deviceId, addDeviceFieldReq.groupId, addDeviceFieldReq.deviceField);
});

module.exports = router;
