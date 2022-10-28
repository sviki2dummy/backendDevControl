export interface IUser{
    id: number,
    username: string,
    email: string,
    password: string,
    deviceFields: IDeviceField[],
    fieldViews: IUserView[],
}

export interface IAuthToken {
    authToken: string,
    userId: number,
    validUntil: string,
}

export interface IUserView {
    deviceFields: IDeviceField[],
    color: string,
    viewName: string,
}

export interface IDeviceFieldAccess {
    deviceField: IDeviceField,
    viewOnly: boolean,
}

export interface IDevice{
    id: number,
    deviceKey: string,
    deviceName: string,
    deviceFieldGroups: IFieldGroup[],
    userAdminId: number,
}

export interface IFieldGroup{
    id: number,
    fields: IDeviceField[],
    groupName: string,
}

export interface IComplexFieldGroup {
    id: number,
    groupName: string,
    fieldGroupStates: IComplexFieldGroupState[],
}

export interface IComplexFieldGroupState{
    stateId: number,
    steteName: string,
    fields: IDeviceField[],
}

export interface IDeviceField{
    deviceId: number,
    id: number,
    fieldName: string,

    IO_Direction: 'input' | 'output',
    fieldType: 'numeric' | 'text' | 'button',
    fieldValuePrefix: string,
    fieldValueSufix: string, //deg Celsius

    fieldValue: number,
    fieldControlType: 'slider' | 'upDownButtons',
    minValue: number,
    maxValue: number,
    valueStep: number,

    textValue: string,
}