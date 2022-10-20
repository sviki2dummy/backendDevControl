
var admin = require('firebase-admin');
var serviceAccount;
try{
 serviceAccount = JSON.parse(process.env.firebaseKey);
}catch{
  console.log('failed to get env.port.firebaseKey');
  console.log('looking for file in firebase.json')
  serviceAccount = require('../firebaseKey.json')
}
// if (!serviceAccount) {
//   console.log('looking for file in firebase.json')
//   serviceAccount = require('../firebaseKey.json')
// }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
let db = admin.firestore();


async function getColletionRef(collectionPath) {
  return db.collection(collectionPath);
}

async function getDocumentRef(collectionPath, documentName) {
  return db.collection(collectionPath).doc(documentName);
}

async function setDocumentValue(collectionPath, documentName, value) {
  return db.collection(collectionPath).doc(documentName).set(value);
}

async function updateDocumentValue(collectionPath, documentName, value) {
  return db.collection(collectionPath).doc(documentName).update(value);
}

async function deleteDocument(collectionPath, documentName) {
  return db.collection(collectionPath).doc(documentName).delete();
}

module.exports.getColletionRef = getColletionRef;
module.exports.getDocumentRef = getDocumentRef;
module.exports.setDocumentValue = setDocumentValue;
module.exports.updateDocumentValue = updateDocumentValue;
module.exports.deleteDocument = deleteDocument;



// export { getColletionRef }
// export { getDocumentRef }
// export { setDocumentValue }
// export { updateDocumentValue }
// export { deleteDocument }
