import WebSocket, { WebSocketServer } from 'ws';
import {v4 as uuid} from "uuid";
const clients = {};

const wss = new WebSocketServer({port: 8000});

wss.on("connection", (ws)=>{
    const id = uuid();
    clients[id] = ws;
    console.log(`New client ${id}`)

    ws.on('message', (rawMessage)=>{
        const {name, message} = JSON.parse(rawMessage);

        for (const id in clients){
            clients[id].send(JSON.stringify([{name, message}]))
        }
    })

    ws.on('close', ()=>{
        delete clients[id];
        console.log(`Client is closed ${id}`)
    })
})