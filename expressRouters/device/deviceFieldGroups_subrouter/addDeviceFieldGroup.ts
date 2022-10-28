import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IAddDeviceFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();


router.post('/', async (req, res) => {
    var addDeviceGroupFieldReq: IAddDeviceFieldGroup = req.body;

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
    
    if(device.userAdminId != user.id){
        res.status(400);
        res.send('User isn\'t admin');
        return;
    }

    let id = await deviceDb.addDeviceFieldGroup(addDeviceGroupFieldReq.deviceId, addDeviceGroupFieldReq.groupName);
    res.sendStatus(200);
});

module.exports = router;
