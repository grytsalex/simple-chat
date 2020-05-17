const express = require('express'); // подключается express
const app = express(); // создаеться express приложение
const server = require('http').Server(app); //  создаеться http server
const io =  require('socket.io')(server); // создаеться socket который будет работать через http server
const socket = io();
console.log(typeof(io))

app.use(express.json())

const rooms = new Map(); // емуляция БД с помощью обьекта Map

app.get('/rooms', (req, res) => {
    rooms.set('Hello', 225)
    res.json(rooms);
})

app.post('/rooms', (req, res) => {
    const { roomId, userName } = req.body;
    if(!rooms.has(roomId)) { // если комнаты нет - она создается
        rooms.set(
          roomId,
          new Map([
            ['users', new Map()],
            ['messages', []],
        ]));
    }
        res.send(); // в ответе прийдет значение
})


socket.status;

io.on('connection', (socket) => {  // когда к socket_ам подключится user выводим в console оповещение
    socket.on('ROOM:JOIN', ({ roomId, userName }) => { // когда прийдет socket action, выполнится функция
        socket.join(roomId);
        rooms.get(roomId).get('users').socket(socket.id, userName);
        const users = rooms.get(roomId).get('users').values();
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
    });

    console.log('user connected', socket.id)
});

app.listen(5000, (err) => { // приложение будет работать через port
    if (err) {
        throw Error(err);
    }
    console.log("App listening on port 5000");
});