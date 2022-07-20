
export default class SocketConnection {
    constructor(io) {
        this.io = io
        this.usernameSocketMap = new Map();

        io.on('connection', (socket) => {
            // Generate a random username and send it to the client to display it
            console.log('A user connected');
            socket.on('addUser', user => {
                if (user.authenticated) {
                    socket.user = user;
                    this.usernameSocketMap.set(user.username, socket);
                }
            })

            // Receive incoming messages and broadcast them
            socket.on('message', (message) => {
                if (this.checkAuthentication(socket)) {
                    io.emit('message', {
                        from: socket.user.username,
                        message: message,
                        time: new Date().toLocaleString()
                    });
                }
            });

            socket.on('friendOnlineStatus', (usernameList) => {
                if (this.checkAuthentication(socket)) {
                    socket.emit('friendOnlineStatus', this.returnListOfOnlineUsers(usernameList));
                }
            })

            socket.on('privateMessage', (data) => {
                if (this.checkAuthentication(socket)) {
                    this.sendPrivateMessage(socket,data);
                }
            })

            socket.on('disconnect', () => {
                if (socket.user) {
                    this.usernameSocketMap.delete(socket.user.username);
                }
            })
        });
    }

    returnListOfOnlineUsers(usernameList) {
        //check if username is inside the map
        //if it is, return a list of online and offline users
        let usernameStatus = [];
        for (let username of usernameList) {
            if (this.usernameSocketMap.has(username)) {
                usernameStatus.push({
                    username: username,
                    status: 'online'
                });
            } else {
                usernameStatus.push({
                    username: username,
                    status: 'offline'
                });
            }
        }
        return usernameStatus;
    }

    sendPrivateMessage(socket, data) {
        const toUser = data.to;
        const fromUser = data.from;
        const room = data.room;
        const message = data.message;
        console.log(fromUser);
        if (this.usernameSocketMap.has(toUser.username) && this.usernameSocketMap.has(fromUser.username)) {
            //connect self to the room
            socket.join(room);
            //connect the other user to the room
            this.usernameSocketMap.get(toUser.username).join(room);

            this.io.to(room).emit('privateMessage', {
                success: true,
                from: fromUser,
                to: toUser,
                room: room,
                message: message,
                time: new Date().toLocaleString()
            });
        } else {
            //send error message not online or not found
            socket.emit('privateMessage', {success: false, message: 'User not online'});
        }
    }


    checkAuthentication(socket) {
        if (!socket.user?.authenticated) {
            socket.emit('error', 'You are not authenticated');
            socket.disconnect(true);
            return false;
        }
        return true;
    }

}