import { deviceDBSingletonFactory, usersDBSingletonFactory } from "../../../firestoreDB/singletonService";
import { DeviceDB } from "../../../firestoreDB/devices/deviceDB";
import { UsersDB } from "../../../firestoreDB/users/userDB";
import { IDeleteFieldGroup } from "../../../models/API/deviceCreateAlterReqRes";
import { IDevice, IUser } from "../../../models/basicModels";

var express = require('express');
var router = express.Router();

var deviceDb: DeviceDB = deviceDBSingletonFactory.getInstance();
var userDb: UsersDB = usersDBSingletonFactory.getInstance();

router.post('/', async (req: any, res: any) => {
    var removeDeviceGroupFieldReq: IDeleteFieldGroup = req.body;

    let user: IUser;
    try {
        user = await userDb.getUserByToken(removeDeviceGroupFieldReq.authToken, true);
    } catch (e) {
        res.status(400);
        res.send(e.message);
        return;
    }

    let device: IDevice;
    try {
        device = await deviceDb.getDevicebyId(removeDeviceGroupFieldReq.deviceId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }

    try {
        deviceDb.getDeviceFieldGroup(device, removeDeviceGroupFieldReq.groupId);
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
        await deviceDb.removeDeviceFieldGroup(removeDeviceGroupFieldReq.deviceId, removeDeviceGroupFieldReq.groupId);
    } catch (e) {
        res.status(400);
        res.send(e.message)
        return;
    }
    res.sendStatus(200);
});

module.exports = router;
