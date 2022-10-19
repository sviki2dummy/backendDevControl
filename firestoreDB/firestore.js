
var admin = require('firebase-admin');
var serviceAccount = require('./devcontrol-backend-firebase-adminsdk-66hq5-62c0da5234.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore();


async function getColletionRef(collectionPath) {
  return db.collection(collectionPath);
}

async function getDocumentRef(collectionPath, documentName){
  return db.collection(collectionPath).doc(documentName);
}

async function setDocumentValue(collectionPath, documentName, value){
  return db.collection(collectionPath).doc(documentName).set(value);
}

async function updateDocumentValue(collectionPath, documentName, value){
  return db.collection(collectionPath).doc(documentName).update(value);
}

async function deleteDocument(collectionPath, documentName){
  return db.collection(collectionPath).doc(documentName).delete();
}

module.exports.getColletionRef = getColletionRef;
module.exports.getDocumentRef = getDocumentRef;
module.exports.setDocumentValue = setDocumentValue;
module.exports.updateDocumentValue = updateDocumentValue;
module.exports.deleteDocument = deleteDocument;



