var firestore = require('../firestore');

export async function getMaxUserID(autoIncrement: boolean): Promise<number> {
    const maxId = (await firestore.getDocumentData('IDhandlingValues', 'maxUserId')).maxUserId || 0;
    if(autoIncrement){
        await setMaxUserId(maxId + 1);
    }
    return maxId;
}

export async function setMaxUserId(id: number){
    return await firestore.setDocumentValue('IDhandlingValues', 'maxUserId', {getMaxUserID: id});
}

export async function getMaxDeviceID(autoIncrement: boolean): Promise<number> {
    let maxId = (await firestore.getDocumentData('IDhandlingValues', 'maxDeviceId')).maxDeviceId || 0;
    if(autoIncrement){
        await setMaxUserId(maxId + 1);
    }
    return maxId;
}

export async function setMaxDeviceId(id: number){
    return await firestore.setDocumentValue('IDhandlingValues', 'maxDeviceId', {maxDeviceId: id});
}