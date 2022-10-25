import { v4 as uuid } from 'uuid';
import { IDevice, IDeviceField, IFieldGroup } from "../../models/basicModels";
import { firestore, getFirebaseInstance } from '../firestore';
import { getMaxIds, getMaxIDsInstance } from '../MaxIDs/MaxIDs';

var deviceDBObj: DeviceDB;

export function createDeviceDBInstance() {
    deviceDBObj = new DeviceDB();
}

export function getDeviceDBInstance(): DeviceDB {
    return deviceDBObj;
}

export class DeviceDB {

    static devCollName = 'devices';
    static usersCollName = 'users';

    firestore: firestore;
    getMaxIds: getMaxIds;
    constructor() {
        this.firestore = getFirebaseInstance();
        this.getMaxIds = getMaxIDsInstance();
    }

    async getDevices(): Promise<IDevice[]> {
        return await this.firestore.getCollectionData(DeviceDB.devCollName) || [];
    }

    async getDevicebyId(id: number): Promise<IDevice> {
        let device = await this.firestore.getDocumentData(DeviceDB.devCollName, `${id}`);
        if (!device) {
            throw ({ message: 'Device doesn\'t exist' });
        }
        return device;
    }

    async addDevice(deviceName: string, userAdminId: number): Promise<number> {
        const allDevices = await this.getDevices();
        let deviceKey: string;
        while (true) {
            deviceKey = uuid().replace('-', '');//.slice(0, 10);
            if (!allDevices.find(o => o.deviceKey === deviceKey)) break;
        }

        const maxId = await this.getMaxIds.getMaxDeviceId(true);
        const newDevice: IDevice = {
            id: maxId + 1,
            deviceName: deviceName,
            userAdminId: userAdminId,
            deviceKey: deviceKey,
            deviceFieldGroups: []
        }
        await this.firestore.setDocumentValue(DeviceDB.usersCollName, `${newDevice.id}`, newDevice);
        return newDevice.id;
    }

    async renameDevice(id: number, deviceName: string) {
        let device: IDevice = await this.getDevicebyId(id);
        await this.firestore.updateDocumentValue(DeviceDB.devCollName, `${id}`, {
            deviceName: deviceName,
        });
    }

    async deleteDevice(id: number) {
        let device = await this.getDevicebyId(id);
        await this.firestore.deleteDocument(DeviceDB.devCollName, `${id}`); //TODO treba pocistit taj device u deviceFieldovima od svih usera
    }

    getDeviceFieldGroup(device: IDevice, groupId: number): IFieldGroup {
        let devGroup = device.deviceFieldGroups[groupId]
        if (!devGroup) {
            throw ({ message: 'Field group doesn\'t exist' });
        }
        return devGroup;
    }

    async addDeviceFieldGroup(deviceId: number, groupName: string): Promise<number> {
        let device = await this.getDevicebyId(deviceId);
        if (device.deviceFieldGroups.find(o => o.groupName === groupName)) {
            throw ({ message: 'Group exists' });
        };
        let newId = await this.getMaxIds.getMaxFieldGroupId(true);
        let newGroup: IFieldGroup = {
            id: newId,
            groupName: groupName,
            fields: [],
        }
        device.deviceFieldGroups.push(newGroup);
        await this.firestore.updateDocumentValue(DeviceDB.devCollName, `${deviceId}`, {
            deviceFieldGroups: {
                newId: newGroup
            }
        })
        return newId;
    }

    async renameDeviceFieldGroup(deviceId: number, groupId: number, groupName: string) {
        let device = await this.getDevicebyId(deviceId);
        this.getDeviceFieldGroup(device, groupId);
        await this.firestore.updateDocumentValue(DeviceDB.devCollName, `${deviceId}`, {
            deviceFieldGroups: {
                groupId: {
                    groupName: groupName,
                }
            }
        })
    }

    getDeviceField(fieldGroup: IFieldGroup, fieldId: number): IDeviceField {
        const field = fieldGroup.fields[fieldId];
        if (!field) {
            throw ({ message: 'Field doesn\'t exist' });
        }
        return field;
    }

    async addDeviceField(deviceId: number, groupId: number, deviceField: IDeviceField): Promise<number> {
        let device = await this.getDevicebyId(deviceId);
        this.getDeviceFieldGroup(device, groupId); //baci error ako nema
        let newId = await this.getMaxIds.getMaxFieldId(true);
        deviceField.id = newId;

        if (deviceField.fieldName.length <= 15) {
            throw ({ message: 'Field name too long (<=15 chars)' })
        }
        if (!deviceField.IO_Direction || !deviceField.fieldType) {
            throw ({ message: 'wrong deviceField setup' })
        }
        await this.firestore.updateDocumentValue('devices', `${deviceId}`, {
            deviceFieldGroups: {
                devGroupId: {
                    fields: {
                        newId: deviceField
                    }
                }
            }
        });
        return newId;
    }

    async renameDeviceField(deviceId: number, groupId: number, fieldId: number, fieldName: string) {
        let device = await this.getDevicebyId(deviceId);
        let groupField = this.getDeviceFieldGroup(device, groupId);
        this.getDeviceField(groupField, fieldId);
        await this.firestore.updateDocumentValue('devices', `${deviceId}`, {
            deviceFieldGroups: {
                groupId: {
                    fields: {
                        fieldId: {
                            fieldName: fieldName,
                        }
                    }
                }
            }
        });
    }

    async deleteDeviceField(deviceId: number, groupId: number, fieldId: number) {
        let device = await this.getDevicebyId(deviceId);
        let groupField = this.getDeviceFieldGroup(device, groupId);
        this.getDeviceField(groupField, fieldId);
        await this.firestore.updateDocumentValue(DeviceDB.devCollName, `${deviceId}`, {
            deviceFieldGroups: {
                devGroupId: {
                    fields: {
                        newId: undefined,
                    }
                }
            }
        });
    }

    async updateFieldValue(deviceId: number, groupId: number, fieldId: number, value: number | string | boolean) {
        let device = await this.getDevicebyId(deviceId);
        let groupField = this.getDeviceFieldGroup(device, groupId);
        let field = this.getDeviceField(groupField, fieldId);
        if (typeof value === 'number' || typeof value === 'boolean') {
            if (field.fieldType === 'numeric' || field.fieldType === 'button') {
                await this.firestore.updateDocumentValue('devices', `${deviceId}`, {
                    deviceFieldGroups: {
                        groupId: {
                            fields: {
                                fieldId: {
                                    fieldValue: value,
                                }
                            }
                        }
                    }
                });
            }
        }
        else if (typeof value === 'string') {
            await this.firestore.updateDocumentValue('devices', `${deviceId}`, {
                deviceFieldGroups: {
                    groupId: {
                        fields: {
                            fieldId: {
                                textValue: value,
                            }
                        }
                    }
                }
            });
        }
    }
}