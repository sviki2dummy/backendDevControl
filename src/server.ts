// import * as BodyParser from 'body-parser';
import * as Express from 'express';
import { server as webSocketServer } from 'websocket';
import { v4 as uuid } from 'uuid';
import { firestoreSingletonFactory } from './firestoreDB/singletonService';
let http = require('http');



export class Server {
    port = process.env.PORT || 8000;

    private app: Express.Application;
    private wsServer: webSocketServer;

    constructor() {
        this.app = Express();
        this.setConfig();
        this.setupWSS();
        this.setupRoutes();
        this.startServer();
    }

    setConfig() {
        let server = http.createServer(this.app);
        this.wsServer = new webSocketServer({
            httpServer: server,
        });
    }

    setupRoutes() {
        this.app.get('/', (req: any, res: any) => {
            console.log('request:/');
            res.send('hello world!!!');
        });

        this.app.get('/update', (req: any, res: any) => {
            console.log('request:/update');
            firestoreSingletonFactory.getInstance().updateDocumentValue('proba', 'Kristian', { name: 'L2', vrijeme: new Date() });
            res.send('update');
        });

        var mainRouter = require('./expressRouters/expressRouter.ts');
        this.app.use('/API', mainRouter);
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        });
    }



    setupWSS() {
        let clients: any[] = [];

        this.wsServer.on('request', function (request: any) {
            var userID: any = uuid();
            console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
            let connection = request.accept(null, request.origin);
            clients[userID] = connection;
            console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
            connection.on('message', function (message: any) {
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
    }
}