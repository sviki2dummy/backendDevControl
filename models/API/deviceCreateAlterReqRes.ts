import { IDeviceField } from "../basicModels";

export interface IAddDevice {
    deviceName: string
    deviceKey?: string,
    userAdminId: number,
}

export interface IRenameDevice {
    deviceName: string,
    deviceId: number,
    authToken: string,
}

export interface IChangeDeviceAdminReq {
    authToken: string,
    deviceId: number,
    userAdminId: number,
}

export interface IRemoveDevice {
    deviceId: number,
    authToken: string,
}



export interface IAddDeviceFieldGroup {
    authToken: string,
    deviceId: number,
    groupName: string,
}

export interface IAddNumericDeviceField {
    authToken: string,

    deviceId: number,
    groupId: number,

    fieldName: string,
    IO_Direction: 'input' | 'output',
    fieldValuePrefix: string,
    fieldValueSufix: string,

    fieldValue: number,
    fieldControlType: 'slider' | 'upDownButtons',
    minValue: number,
    maxValue: number,
    valueStep: number,
}

export interface IAddDeviceField {
    authToken: string,
    deviceId: number,
    groupId: number,
    deviceField: IDeviceField,
}

export interface IAddDeviceField {
    authToken: string,
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

