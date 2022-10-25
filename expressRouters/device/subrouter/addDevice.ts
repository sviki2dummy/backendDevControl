import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { IAddDevice } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('./firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    var addDeviceReq: IAddDevice = req.body;
    let id = await deviceDb.addDevice(addDeviceReq.deviceName, addDeviceReq.userAdminId);
    res.send(`${id}`);
});

module.exports = router;
