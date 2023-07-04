const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

//Initialisation du serveur
app.use(cors);
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// Socket.io
io.on("connection", (socket) => {
    // transmet l'id lors d'une connection
    console.log(`User connected : ${socket.id}`);

    // Me permet de rejoindre un groupe/chaine
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    // Me permet de récupérer les messages du client
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    });
});

// On lance le serveur
server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
});