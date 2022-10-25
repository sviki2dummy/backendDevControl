var express = require('express');
var router = express.Router();

var addDeviceRouter = require('./subrouter/addDevice.ts')
router.use('/addDevice', addDeviceRouter);

var addDeviceFieldGroup = require('./subrouter/addDeviceFieldGroup.ts');
router.use('/addDeviceFieldGroup', addDeviceFieldGroup);

var addDeviceField = require('./subrouter/addDeviceField.ts');
router.use('/addDeviceField', addDeviceField);

var deleteDevice = require('./subrouter/deleteDevice.ts');
router.use('/deleteDevice', deleteDevice);


var deleteDeviceFieldGroup = require('./subrouter/deleteDeviceFieldGroup.ts');
router.use('/deleteDeviceFieldGroup', deleteDeviceFieldGroup);

var deleteDeviceField = require('./subrouter/deleteDeviceField.ts');
router.use('/deleteDeviceField', deleteDeviceField);

module.exports = router;