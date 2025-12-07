const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // frontend fayllari shu papkada bo'ladi

io.on('connection', (socket) => {
    console.log('A user connected');

    // username va xabar kelganda barchaga tarqatish
    socket.on('chat message', (data) => {
        io.emit('chat message', data); // data = { username, message }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
