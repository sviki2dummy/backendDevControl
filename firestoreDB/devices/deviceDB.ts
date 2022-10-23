import { v4 as uuid } from 'uuid';
import { IDevice } from "../../models/basicModels";
import { firestore } from '../firestore';
import { getMaxDeviceID } from '../IDhandlingValues/IDhandlingValues';

export class deviceDB extends firestore {

    static devCollName = 'devices';

    async getDevices(): Promise<IDevice[]> {
        return await this.getCollectionData(deviceDB.devCollName) || [];
    }

    async getDevicebyId(id: number) {
        return await this.getDocumentData(deviceDB.devCollName, `${id}`);
    }

    async addDevice(deviceName: string, userAdminId: number): Promise<number> {
        const allDevices = await this.getDevices();

        let deviceKey: string;
        while (true) {
            deviceKey = uuid().replace('-', '').slice(0, 10);
            if (!allDevices.find(o => o.deviceKey === deviceKey)) break;
        }

        const maxId = await getMaxDeviceID(true);
        const newDevice: IDevice = {
            id: maxId + 1,
            deviceName: deviceName,
            userAdminId: userAdminId,
            deviceKey: deviceKey,
            deviceFieldGroups: []
        }
        await this.setDocumentValue('users', `${newDevice.id}`, newDevice);
        return newDevice.id;
    }

    async renameDevice(id: number, deviceName: string) {
        let device: IDevice = await this.getDevicebyId(id);
        if (!device) {
            throw ({ message: 'Device doesn\'t exist in database' });
        }
        device.deviceName = deviceName;
        await this.updateDocumentValue(deviceDB.devCollName, `${id}`, device);
    }

    async deleteDevice(id: number) {
        let device = await this.getDevicebyId(id);
        if (!device) {
            throw ({ message: 'Device doesn\'t exist in database' });
        }
        await this.deleteDocument(deviceDB.devCollName, `${id}`);
    }
}