const cookie = require("cookie");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 8000

io.on("connection", (socket) => {
	// Create new user from socket
	var cookies = cookie.parse(socket.request.headers.cookie);
	console.log(socket.request.headers.cookie)
	socket.emit("create-player", socket.id)

	// Message chat room
	socket.on("send-message", msgObj => io.emit("message", msgObj))

    // console.log(`New socket connection`)
})


server.listen(port, () => console.log(`server is running on port ${port}`));
