interface IAddDevice {
    deviceName: string
    deviceKey?: string,
    userAdminId: number,
}


interface IRemoveDevice {
    deviceId: number,    
}

interface IAddDeviceField {
    deviceId: number,
    deviceField: IDeviceField,
}

interface IRemoveDeviceField {
    deviceId: number,
    fieldId: number,
}
