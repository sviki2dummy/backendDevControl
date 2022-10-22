var express = require('express');
var webSocketServer = require('websocket').server;
var http = require('http');

let port = process.env.PORT || 8000;

let app = express();

let server = http.createServer(app);

let wsServer = new webSocketServer({
  httpServer: server,
});


var firestore = require('./firestoreDB/firestore.ts');
// firestore.updateDocumentValue('proba','Kristian', {name: 'Kristian', vrijeme: new Date()});
// firestore.updateDocumentValue('users','Kristian', {name2: 'Kristian2'});
// firestore.setDocumentValue('users','Kristian', {});
// firestore.deleteDocument('users','Kristian'); 
// firestore.updateDocumentValue('users/users2/users3','users4', {name: 'Kristian'});


//API
app.get('/',(req,res) => {
  console.log('request:/');
  res.send('hello world!!!');
});

app.get('/x',(req,res) => {
  console.log('request:/x');
  res.send('xReq');
});

app.get('/combo',(req,res) => {
  console.log('request:/combo');
  res.send('combo');
});

app.get('/update',(req,res) => {
  console.log('request:/update');
  firestore.updateDocumentValue('proba','Kristian', {name: 'Kristian', vrijeme: new Date()});
  res.send('update');
});

app.get('/ts',(req,res) => {
  console.log('request:/ts');
  res.send('typescript');
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