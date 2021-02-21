const express = require('express'); // подключается express
const app = express(); // создаеться express приложение
const server = require('http').Server(app); //  создаеться http server
const io =  require('socket.io')(server); // создаеться socket который будет работать через http server

app.use(express.json())

const rooms = new Map(); // емуляция БД с помощью обьекта Map

app.get('/rooms/:id', (req, res) => {
    const { id: roomId } = req.params;
    const obj = rooms.has(roomId) ? { // проверяется есть такая комната или нет, если есть возвращается обьект
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    } : { users: [], messages: [] }; // если комнаты нет возвращается пустые значения
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const { roomId } = req.body;
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

io.on('connection', (socket) => {  // когда к socket_ам подключится user выводим в console оповещение
    socket.on('ROOM:JOIN', ({ roomId, userName }) => { // когда прийдет socket action, выполнится функция
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
    });

    socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
        const obj = { 
            userName,
            text
        }

        rooms.get(roomId).get('messages').push(obj); // добавляется сообщение в комнату 
        socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj); // сообщение отправляется всем сокетам
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if(value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
            }
        })
    });

    console.log('user connected', socket.id)
});



server.listen(9999, (err) => { // приложение будет работать через port
    if (err) {
        throw Error(err);
    }
    console.log("Server is running!");
});