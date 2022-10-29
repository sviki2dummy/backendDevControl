import { createJsxClosingElement } from "typescript";
import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IAddFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();


router.post('/', async (req, res) => {
    var addDeviceGroupFieldReq: IAddFieldGroup = req.body;

    let user: IUser;
    try {
        user = await userDb.getUserByToken(addDeviceGroupFieldReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    let device: IDevice;
    try {
        device = await deviceDb.getDevicebyId(addDeviceGroupFieldReq.deviceId);
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

    if (device.deviceFieldGroups) {
        Object.keys(device.deviceFieldGroups).forEach(o => {
            if (device.deviceFieldGroups[o].groupName === addDeviceGroupFieldReq.groupName) {
                res.status(400);
                res.send('Group with that name already exists');
                return;
            }
        });
    }

    try {
        await deviceDb.addDeviceFieldGroup(addDeviceGroupFieldReq.deviceId, addDeviceGroupFieldReq.groupName);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }
    res.sendStatus(200);
});

module.exports = router;
