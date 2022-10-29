import { IDeviceFieldBasic, IDeviceFieldButton, IDeviceFieldMultipleChoice, IDeviceFieldNumeric, IDeviceFieldRGB, IDeviceFieldText } from "../basicModels"

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

export interface IRemoveDeviceReq {
    deviceId: number,
    authToken: string,
}





export interface IAddDeviceFieldGroup {
    authToken: string,
    deviceId: number,
    groupName: string,
}

export interface IRenameDeviceFieldGroup {
    authToken: string,
    deviceId: number,
    groupId: number,
    groupName: string,
}

export interface IRemoveDeviceFieldGroup {
    authToken: string,
    deviceId: number,
    groupId: number,
}





export interface IAddDeviceFieldReq {
    authToken: string,
    deviceField: IAddDeviceFieldBasic,
    IO: 'input' | 'output',
}

export interface IAddDeviceFieldBasic {
    deviceId: number,
    groupId: number,
    fieldName: string,

    fieldType: 'numeric' | 'text' | 'button' | 'multipleChoice' | 'RGB',
    fieldValue: IDeviceFieldNumeric | IDeviceFieldText | IDeviceFieldButton | IDeviceFieldMultipleChoice | IDeviceFieldRGB,
}

export interface IRemoveDeviceField {
    deviceId: number,
    groupId: number,
    fieldId: number,
}

