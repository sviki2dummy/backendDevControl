import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IAddDeviceReq, IDeleteFieldReq } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IDeviceFieldBasic, IFieldGroup, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();

router.post('/', async (req, res) => {
    var removeDeviceReq: IDeleteFieldReq = req.body;
    
    let user: IUser;
    try {
        user = await userDb.getUserByToken(removeDeviceReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }
    console.log(user);
    
    let device: IDevice;
    try {
        device = await deviceDb.getDevicebyId(removeDeviceReq.deviceId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    let fieldGroup: IFieldGroup;
    try {
        fieldGroup = deviceDb.getDeviceFieldGroup(device, removeDeviceReq.groupId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    let field: IDeviceFieldBasic;
    try {
        field = deviceDb.getDeviceField(fieldGroup, removeDeviceReq.fieldId);
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
        await deviceDb.deleteDeviceField(removeDeviceReq.deviceId, removeDeviceReq.groupId, removeDeviceReq.fieldId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }
    res.sendStatus(200);
});

module.exports = router;
