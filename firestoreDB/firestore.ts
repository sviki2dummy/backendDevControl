export class firestore {

  db: any;

  constructor() {
    var admin = require('firebase-admin');
    var serviceAccount;
    try {
      serviceAccount = JSON.parse(process.env.firebaseKey);
    } catch {
      console.log('failed to get env.port.firebaseKey');
      console.log('looking for file in firebase.json')
      serviceAccount = require('../firebaseKey.json')
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    this.db = admin.firestore();
  }

  async setDocumentValue(collectionPath: string, documentName: string, value) {
    return await this.db.collection(collectionPath).doc(documentName).set(value);
  }

  async updateDocumentValue(collectionPath: string, documentName: string, value) {
    return await this.db.collection(collectionPath).doc(documentName).update(value);
  }

  async deleteDocument(collectionPath: string, documentName: string) {
    return await this.db.collection(collectionPath).doc(documentName).delete();
  }

  async getDocumentData(collectionPath: string, documentName: string): Promise<any> {
    let doc = this.db.collection(collectionPath).doc(documentName);
    let data = (await doc.get()).data();
    return data;
  }

  async getCollectionData(collectionPath: string): Promise<any[]> {
    let collection = await this.db.collection(collectionPath).get();
    let data = [];
    collection.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  }

  getColletionRef(collectionPath: string) {
    return this.db.collection(collectionPath);
  }

  getDocumentRef(collectionPath: string, documentName: string) {
    return this.db.collection(collectionPath).doc(documentName);
  }

}