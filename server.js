const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io =  require('socket.io')(server, { origin: '*' });

const rooms = new Map();

app.use(cors());

app.get('/rooms', (req, res) => {
    rooms.set('Hello', 225)
    res.json(rooms);
})

io.on('connection', (socket) => {
    console.log('user connected', socket.id)
});

app.listen(5000, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("App listening on port 5000");
});