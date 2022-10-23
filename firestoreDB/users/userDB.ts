import { IUser } from '../../models/basicModels';
import { getCollectionData, getDocumentData, setDocumentValue, updateDocumentValue } from '../firestore';
import { getMaxUserID, setMaxUserId } from '../IDhandlingValues/IDhandlingValues';

export async function getUsers(): Promise<IUser[]> {
    return await getCollectionData('users');
}

export async function getUserbyId(id: number): Promise<IUser> {
    return await getDocumentData('users', `${id}`);
}

export async function getUserbyCreds(username: string, password: string): Promise<IUser> {
    var users = await getUsers();
    var user = users.find(user => user.username === username && user.password === password);
    return user;
}

export async function addUser(username: string, password: string, email: string): Promise<number> {
    var users = await getUsers();
    var sameNameUser = users.find(user => user.username === username);
    if (sameNameUser) return -1;
    var maxIDdoc = await getMaxUserID();
    var newUser: IUser = {
        id: maxIDdoc + 1,
        password: password,
        username: username,
        email: email,
        deviceFields: [],
    }
    await setMaxUserId(newUser.id);
    await setDocumentValue('users', `${newUser.id}`, newUser);
    return newUser.id;
}

export async function changeUserPassword(id: number, oldP: string, newP: string) {
    let user = await getUserbyId(id);
    if (!user) {
        throw ({ message: 'User doesn\'t exist in database' });
    }
    if (user.password !== oldP) {
        throw ({ message: 'Wrong password' });
    }
    await updateDocumentValue('users', `${id}`, { password: newP });
}

export async function changeUsername(id: number, username: string) {
    let user = await getUserbyId(id);
    if (!user) {
        throw ({ message: 'User doesn\'t exist in database' });
    }
    await updateDocumentValue('users', `${id}`, { username: username });
}

