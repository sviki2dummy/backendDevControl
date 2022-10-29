import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IAddDeviceReq } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

var userDBfile = require('../../../firestoreDB/users/userDB.ts');
var userDb: UsersDB = userDBfile.getUserDBInstance();

router.post('/', async (req, res) => {
    var addDeviceReq: IAddDeviceReq = req.body;
    try {
        await userDb.getUserbyId(addDeviceReq.userAdminId);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }
    let id = await deviceDb.addDevice(addDeviceReq.deviceName, addDeviceReq.userAdminId);
    res.send(`${id}`);
});

module.exports = router;
