// npm init -y
// npm install express
// npm install multer, middleware de terceros
// node + nombre archivo


import express from "express";
import rCarts from './api/carts/carts_route.js';
import rProducts from "./api/products/products_route.js";
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars';
import { Server } from "socket.io";



const PORT = 8080;
const WS_PORT = 3000; //puerto para websockets

//servidor express base
const server = express();
const httpServer = server.listen(WS_PORT, () => {
    console.log(`Servidor socketio iniciado en puerto ${WS_PORT}`);
});
const io = new Server(httpServer, { cors: { origin: "http://localhost:8080" } });

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


//Endpoints API REST
server.use('/api', rProducts);
server.use('/api', rCarts);

//parte estatica
server.use('/public', express.static(`${__dirname}/public`));

//motor de plaantillas
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');



server.listen(PORT, () => {
    console.log(`Servidor base API/ iniciado en puerto ${PORT}`);
})


//Eventos socket.io
io.on('connection', (socket) => { // Escuchamos el evento connection por nuevas conexiones de clientes
    console.log(`Cliente conectado (${socket.id})`);
    
    // Emitimos el evento server_confirm
    socket.emit('server_confirm', 'Conexión recibida');
    
    socket.on("disconnect", (reason) => {
        console.log(`Cliente desconectado (${socket.id}): ${reason}`);
    });
    
    // Escuchamos por el evento evento_cl01 desde el cliente
    socket.on('event_cl01', (data) => {
        console.log(data);
    });

    socket.on('new_message', (data) => {
        socket.emit('msg_received', data);
    });

});
