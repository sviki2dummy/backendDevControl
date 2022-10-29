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



var addDeviceFieldGroup = require('./deviceFieldGroups_subrouter/addDeviceFieldGroup.ts');
router.use('/addDeviceFieldGroup', addDeviceFieldGroup);

var renameDeviceFieldGroup = require('./deviceFieldGroups_subrouter/renameDeviceFieldGroup.ts');
router.use('/renameDeviceFieldGroup', renameDeviceFieldGroup);

var deleteDeviceFieldGroup = require('./deviceFieldGroups_subrouter/deleteDeviceFieldGroup.ts');
router.use('/deleteDeviceFieldGroup', deleteDeviceFieldGroup);



var addDeviceField = require('./deviceField_subrouter/addDeviceField.ts');
router.use('/addDeviceField', addDeviceField);


// var deleteDeviceFieldGroup = require('./device_subrouter/deleteDeviceFieldGroup.ts');
// router.use('/deleteDeviceFieldGroup', deleteDeviceFieldGroup);

// var deleteDeviceField = require('./device_subrouter/deleteDeviceField.ts');
// router.use('/deleteDeviceField', deleteDeviceField);

module.exports = router;