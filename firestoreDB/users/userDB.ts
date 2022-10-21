import { IUser } from '../../models/basicModels';
import { CollectionReference } from "firebase/firestore/lite";


var firestore = require('../firestore');

const allUsersRef = firestore.getColletionRef('users');


async function getUsers(): Promise<IUser[]> {
    var allUsersRef = firestore.getColletionRef('users');
    var usersDocs = await allUsersRef.get();
    let users = [];
    // let modelUser: IUser = {} as IUser;
    // modelUser.deviceFields = [];
    // modelUser.email = "";
    // modelUser.id = 0;
    // modelUser.password = "";
    // modelUser.username = "";

    usersDocs.forEach(user => {
        // var cleanUser: IUser = {} as IUser;
        user = user.data();
        // console.log(user);
        // Object.keys(modelUser).forEach(property => {
        // console.log(property);
        // cleanUser[property] = user[property];
        // });
        // console.log(cleanUser);
        // users.push(cleanUser);
        users.push(user);
    });
    // console.log(users);

    return users;
}

async function getUserbyCreds(username: string, password: string): Promise<number> {
    var users = await getUsers();
    var user = users.find(user => user.username === username && user.password === password); 
    return user?.id || -1;
}

async function addUser(username: string, password: string, email: string): Promise<number> {
    var users = await getUsers();
    var sameNameUser = users.find(user => user.username === username);
    if (sameNameUser) {
        return -1;
    }
    var maxIDdoc = firestore.getDocumentRef('IDhandlingValues', 'maxUserId');
    maxIDdoc = (await maxIDdoc.get()).data().maxUserId;
    var newUser: IUser = {} as IUser
    newUser.id = maxIDdoc + 1;
    newUser.password = password
    newUser.username = username;
    newUser.email = '';
    firestore.setDocumentValue('IDhandlingValues', 'maxUserId', { maxUserId: newUser.id });
    firestore.setDocumentValue('users', `${newUser.id}`, newUser);
    return newUser.id;
}


module.exports.getAllUsers = getUsers;
module.exports.addUser = addUser;
module.exports.getUserbyCreds = getUserbyCreds;
