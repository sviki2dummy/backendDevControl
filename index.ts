import { firestore } from "./firestoreDB/firestore";

var express = require('express');
var webSocketServer = require('websocket').server;
var http = require('http');
let port = process.env.PORT || 8000;
let app = express();
let server = http.createServer(app);

let wsServer = new webSocketServer({
  httpServer: server,
});

var firestoreFile = require('./firestoreDB/firestore.ts');
firestoreFile.createFirebaseInstance();
var deviceDBfile = require('./firestoreDB/devices/deviceDB.ts');
deviceDBfile.createDeviceDBInstance();
var usersDBfile = require('./firestoreDB/users/userDB.ts');
usersDBfile.createUserDBInstance();

let firestoreDB: firestore = firestoreFile.getFirebaseInstance();

app.get('/',(req,res) => {
  console.log('request:/');
  res.send('hello world!!!');
});

app.get('/update',(req,res) => {
  console.log('request:/update');
  firestoreDB.updateDocumentValue('proba','Kristian', {name: 'Kristian', vrijeme: new Date(), obj: {
    obj:{obj: {obj: 3}}
  }});
  res.send('update');
});

var mainRouter = require('./expressRouters/expressRouter.ts');
app.use('/API', mainRouter);

//END API


//WSS
let clients = {};

let getUniqueID = () => {
  let s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  let connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);
      // broadcasting message to all connected clients
      for (let key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', key);
      }
    }
  })
});
//END WSS

server.listen(port, () => {
  console.log('listening on port ' + port);
});