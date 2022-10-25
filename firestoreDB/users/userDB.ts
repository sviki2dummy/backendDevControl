import { IUser } from '../../models/basicModels';
import { getMaxIds, getMaxIDsInstance } from '../MaxIDs/MaxIDs';
import { firestore, getFirebaseInstance } from '../firestore';

var userDBObj: usersDB;

export function createUserDBInstance() {
    userDBObj = new usersDB();
}

export function getUserDBInstance(): usersDB {
    return userDBObj;
}
export class usersDB {

    static usersCollName = 'users';
    firestore: firestore;
    getMaxIds: getMaxIds;
    constructor() {
        this.firestore = getFirebaseInstance();
        this.getMaxIds = getMaxIDsInstance();
    }

    async getUsers(): Promise<IUser[]> {
        return await this.firestore.getCollectionData(usersDB.usersCollName);
    }

    async getUserbyId(id: number): Promise<IUser> {
        return await this.firestore.getDocumentData(usersDB.usersCollName, `${id}`);
    }

    async getUserbyCreds(username: string, password: string): Promise<IUser> {
        var users = await this.getUsers();
        const user = users.find(user => user.username === username && user.password === password);
        return user;
    }

    async addUser(username: string, password: string, email: string): Promise<number> {
        var users = await this.getUsers();
        var sameNameUser = users.find(user => user.username === username);
        if (sameNameUser) throw ({ message: 'User with same name exists' });
        var maxIDdoc = await this.getMaxIds.getMaxUserId(true);
        var newUser: IUser = {
            id: maxIDdoc + 1,
            password: password,
            username: username,
            email: email,
            deviceFields: [],
            fieldViews: [],
        }
        await this.firestore.setDocumentValue(usersDB.usersCollName, `${newUser.id}`, newUser);
        return newUser.id;
    }

    async changeUserPassword(id: number, oldP: string, newP: string) {
        let user = await this.getUserbyId(id);
        if (!user) {
            throw ({ message: 'User doesn\'t exist in database' });
        }
        if (user.password !== oldP) {
            throw ({ message: 'Wrong password' });
        }
        await this.firestore.updateDocumentValue(usersDB.usersCollName, `${id}`, { password: newP });
    }

    async changeUsername(id: number, username: string) {
        let user = await this.getUserbyId(id);
        if (!user) {
            throw ({ message: 'User doesn\'t exist in database' });
        }
        user.username = username;
        await this.firestore.updateDocumentValue(usersDB.usersCollName, `${id}`, user);
    }

    async deleteUser(id: number) {
        let user = await this.getUserbyId(id);
        if (!user) {
            throw ({ message: 'User doesn\'t exist in database' });
        }
        await this.firestore.deleteDocument(usersDB.usersCollName, `${id}`);
    }
}