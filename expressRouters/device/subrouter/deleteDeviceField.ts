import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { IAddDevice, IRemoveDeviceField } from "../../../models/API/deviceCreateAlterReqRes";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('./firestoreDB/devices/deviceDB');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    var removeDeviceReq: IRemoveDeviceField = req.body;
    let id = await deviceDb.deleteDeviceField(removeDeviceReq.deviceId, removeDeviceReq.groupId, removeDeviceReq.fieldId);
    res.send(`${id}`);
});

module.exports = router;
