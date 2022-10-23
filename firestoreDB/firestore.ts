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
let db = admin.firestore();

export async function setDocumentValue(collectionPath: string, documentName: string, value) {
  return await db.collection(collectionPath).doc(documentName).set(value);
}

export async function updateDocumentValue(collectionPath: string, documentName: string, value) {
  return await db.collection(collectionPath).doc(documentName).update(value);
}

export async function deleteDocument(collectionPath: string, documentName: string) {
  return await db.collection(collectionPath).doc(documentName).delete();
}

export async function getDocumentData(collectionPath: string, documentName: string): Promise<any> {
  let doc = db.collection(collectionPath).doc(documentName);
  let data = (await doc.get()).data();
  return data;
}

export async function getCollectionData(collectionPath: string): Promise<any[]> {
  let collection = await db.collection(collectionPath).get();
  let data = [];
  collection.forEach(doc => {
    data.push(doc.data());
  });
  return data;
}

export function getColletionRef(collectionPath: string) {
  return db.collection(collectionPath);
}

export function getDocumentRef(collectionPath: string, documentName: string) {
  return db.collection(collectionPath).doc(documentName);
}

// module.exports.setDocumentValue = setDocumentValue;
// module.exports.updateDocumentValue = updateDocumentValue;
// module.exports.deleteDocument = deleteDocument;
// module.exports.getColletionRef = getColletionRef;
// module.exports.getDocumentRef = getDocumentRef;
// module.exports.getDocumentData = getDocumentData;
// module.exports.getCollectionData = getCollectionData;