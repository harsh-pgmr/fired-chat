const express = require('express');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const passport = require('./utils/passport-config');
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
require('dotenv').config()

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server)

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL


mongoose.connect(DATABASE_URL,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error("####  Database connection error  ####\n", error));
db.once('open', () => console.log('Atlas connected.'))




// Configure CORS 
app.use(cors({
    origin: ['https://fired-chat.netlify.app', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal server error from main file.'
    });
  });

// web socket event handling
io.on("connection", (socket) => {
    
    socket.on("join_room", async (data) => {
        const { room, userName, id } = data;
        socket.join(room);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});


app.use('/users', userRoutes)
app.use('/messages', messagesRoutes)





server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}...`);
});

