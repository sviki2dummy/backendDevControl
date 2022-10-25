import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { IAddDevice, IAddDeviceField } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('./firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    var addDeviceFieldReq: IAddDeviceField = req.body;
    let id = await deviceDb.addDeviceField(addDeviceFieldReq.deviceId, addDeviceFieldReq.groupId, addDeviceFieldReq.deviceField);
    res.send(`${id}`);
});

module.exports = router;
