import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { IRemoveDevice } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('./firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    var deleteDeviceReq: IRemoveDevice = req.body;
    await deviceDb.deleteDevice(deleteDeviceReq.deviceId);
    res.sendStatus(200);
});

module.exports = router;
