var firestore = require('../firestore');

export async function getMaxUserID(): Promise<number> {
    return (await firestore.getDocumentData('IDhandlingValues', 'maxUserId')).maxUserId || 0;
}

export async function setMaxUserId(id: number){
    return await firestore.setDocumentValue('IDhandlingValues', 'maxUserId', {getMaxUserID: id});
}