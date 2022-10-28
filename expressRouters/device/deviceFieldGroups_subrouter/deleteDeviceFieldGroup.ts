import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";

var express = require('express');
var router = express.Router();

var deviceDBfile = require('../../../firestoreDB/devices/deviceDB.ts');
var deviceDb: DeviceDB = deviceDBfile.getDeviceDBInstance();

router.post('/', async (req, res) => {
    // var deleteDeviceFieldGroupReq: IRemoveDeviceFieldGroup = req.body;
    // await deviceDb.removeDeviceFieldGroup(deleteDeviceFieldGroupReq.deviceId, deleteDeviceFieldGroupReq.groupId);
    res.sendStatus(400);
});

module.exports = router;
