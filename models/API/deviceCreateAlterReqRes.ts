import { IDeviceField } from "../basicModels";

export interface IAddDevice {
    deviceName: string
    deviceKey?: string,
    userAdminId: number,
}


export interface IRemoveDevice {
    deviceId: number,    
}

export interface IAddDeviceFieldGroup{
    deviceId: number,
    groupName: string,
}

export interface IAddDeviceField {
    deviceId: number,
    groupId: number,
    deviceField: IDeviceField,
}

export interface IRemoveDeviceField {
    deviceId: number,
    groupId: number,
    fieldId: number,
}

export interface IRemoveDeviceFieldGroup {
    deviceId: number,
    groupId: number,
}

