const port = process.env.PORT || 8000;


const webSocketServer = require('websocket').server;
const http = require('http');
const { client } = require('websocket');


const express = require('express');
const app = express();

app.get('/',(req,res) => {
  console.log('request:/');
  res.send('hello world!!!');
});

app.get('/x',(req,res) => {
  console.log('request:/');
  res.send('xReq');
});

app.listen(port, () => {
  console.log('started listening on portt ' + port)
});

const clients = {};






const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected clients
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', key);
      }
    }
  })
});
