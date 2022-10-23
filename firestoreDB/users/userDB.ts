import { IUser } from '../../models/basicModels';
import { firestore } from '../firestore';
import { getMaxUserID } from '../IDhandlingValues/IDhandlingValues';

export class usersDB extends firestore {

    static usersCollName = 'users';

    async getUsers(): Promise<IUser[]> {
        return await this.getCollectionData(usersDB.usersCollName);
    }

    async getUserbyId(id: number): Promise<IUser> {
        return await this.getDocumentData(usersDB.usersCollName, `${id}`);
    }

    async getUserbyCreds(username: string, password: string): Promise<IUser> {
        var users = await this.getUsers();
        return users.find(user => user.username === username && user.password === password);
    }

    async addUser(username: string, password: string, email: string): Promise<number> {
        var users = await this.getUsers();
        var sameNameUser = users.find(user => user.username === username);
        if (sameNameUser) return -1;
        var maxIDdoc = await getMaxUserID(true);
        var newUser: IUser = {
            id: maxIDdoc + 1,
            password: password,
            username: username,
            email: email,
            deviceFields: [],
            fieldViews: [],
        }
        await this.setDocumentValue(usersDB.usersCollName, `${newUser.id}`, newUser);
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
        await this.updateDocumentValue(usersDB.usersCollName, `${id}`, { password: newP });
    }

    async changeUsername(id: number, username: string) {
        let user = await this.getUserbyId(id);
        if (!user) {
            throw ({ message: 'User doesn\'t exist in database' });
        }
        user.username = username;
        await this.updateDocumentValue(usersDB.usersCollName, `${id}`, user);
    }

    async deleteUser(id: number) {
        let user = await this.getUserbyId(id);
        if (!user) {
            throw ({ message: 'User doesn\'t exist in database' });
        }
        await this.deleteDocument(usersDB.usersCollName, `${id}`);
    }
}