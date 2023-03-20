import express from "express";
import cors from "cors";
import http from "http";

import connection from "./database/db.js";
import Router from "./routes/route.js";

import * as dotenv from "dotenv";
import { initSocket } from "./utils/socket.js";
dotenv.config();

const app = express();

const server = http.createServer(app);
initSocket(server);
server.timeout = 120000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

connection();

server.listen(3005, () => {
    console.log("Server is running on port: 3005");
});
