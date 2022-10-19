
var admin = require('firebase-admin');

console.log('env');
console.log(JSON.stringify(process.env));
console.log(JSON.stringify(process.env.firebaseKey));

var serviceAccount = process.env.firebaseKey;

if(!serviceAccount){
  serviceAccount = require('../firebaseKey.json')
}

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



