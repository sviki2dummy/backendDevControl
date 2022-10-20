interface IUser{
    id: number,
    username: string,
    email: string,
    password: string,
    deviceFields: IDeviceField[],
}

interface IDeviceFieldAccess {
    deviceField: IDeviceField,
    viewOnly: boolean,
}

interface IDevice{
    id: number,
    deviceKey: number,
    deviceName: string,
    deviceFieldGroups: IFieldGroup[],
    userAdminId: number,
}

interface IFieldGroup{
    fields: IDeviceField[],
    groupName: string,
}

interface IDeviceField{
    fieldType: 'numeric' | 'text',
    field: IDeviceNumericField | IDeviceTextField,
}

interface IDeviceNumericField{
    id: number,
    fieldName: string,
    fieldValue: number,
    fieldControlType: 'slider' | 'upDownButtons',
    minValue: number,
    maxValue: number,
    valueStep: number,
    IO_Direction: 'input' | 'output', 
}

interface IDeviceTextField {
    id: number,
    fieldName: string,
    fieldText: string,
}