if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const router = require('./routes/router');
// const PORT = process.env.PORT || 4000;

// app.use(cors());
// app.use(express.json({limit: '5mb'}))
// app.use(express.urlencoded({ extended: false, limit: '5mb' }))

// app.use(router)

// app.listen(PORT, () => console.log(`server is running in port ${PORT}...`))

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const router = require('./routes/router');
const PORT = process.env.PORT || 4000;
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: false, limit: '5mb' }))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('Refetch Approval', (data) => {
        console.log(data, 'MESSAGE');
        io.emit('Refetch to All', {
            message: 'Please Refetch All Approval'
        })
    })
});

app.use(router)

// app.listen(PORT, () => console.log(`server is running in port ${PORT}...`))
server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});

module.exports = {
    io
}

// module.exports = app