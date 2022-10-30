var express = require('express');
var router = express.Router();

var addDeviceRouter = require('./device_subrouter/addDevice.ts')
router.use('/addDevice', addDeviceRouter);

var renameDeviceRouter = require('./device_subrouter/renameDevice.ts')
router.use('/renameDevice', renameDeviceRouter);

var changeDeviceRouter = require('./device_subrouter/changeDeviceAdmin.ts')
router.use('/changeAdmin', changeDeviceRouter);

var deleteDevice = require('./device_subrouter/deleteDevice.ts');
router.use('/deleteDevice', deleteDevice);



var addFieldGroup = require('./deviceFieldGroups_subrouter/addDeviceFieldGroup.ts');
router.use('/addFieldGroup', addFieldGroup);

var renameFieldGroup = require('./deviceFieldGroups_subrouter/renameDeviceFieldGroup.ts');
router.use('/renameFieldGroup', renameFieldGroup);

var deleteFieldGroup = require('./deviceFieldGroups_subrouter/deleteDeviceFieldGroup.ts');
router.use('/deleteFieldGroup', deleteFieldGroup);



var addField = require('./deviceField_subrouter/addDeviceField.ts');
router.use('/addField', addField);

var renameField = require('./deviceField_subrouter/renameField.ts');
router.use('/renameField', renameField);

var deleteField = require('./deviceField_subrouter/deleteDeviceField.ts');
router.use('/deleteField', deleteField);



import { deviceDBSingletonFactory } from "../../firestoreDB/singletonService";
var deviceDb = deviceDBSingletonFactory.getInstance();
router.get('/:id', async (req: any, res: any) => {
    let id = req.params.id;
    console.log(id);

    let device = await deviceDb.getDevicebyId(id);
    res.json(device);
});





module.exports = router;