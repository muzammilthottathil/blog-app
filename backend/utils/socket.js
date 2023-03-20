import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            // methods: ['GET', 'POST']
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected ", socket.id);

        socket.on("on_post_creation", (data) => {
            socket.broadcast.emit("new_post", { ...data, time: new Date() });
        });
    });
};
