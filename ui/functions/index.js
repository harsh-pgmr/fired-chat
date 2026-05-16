
// WebSocket server set up

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer();
const io = socketIo(server, {
    cors: { origin: "*" }
})

io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        // console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});


server.listen(5000, () => {
    console.log("WebSocket server is running on port 5000...");
});

