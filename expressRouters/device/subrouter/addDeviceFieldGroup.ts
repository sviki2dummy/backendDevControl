import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { IAddDevice, IAddDeviceFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('./firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    var addDeviceGroupFieldReq: IAddDeviceFieldGroup = req.body;
    let id = await deviceDb.addDeviceFieldGroup(addDeviceGroupFieldReq.deviceId, addDeviceGroupFieldReq.groupName);
    res.send(`${id}`);
});

module.exports = router;
