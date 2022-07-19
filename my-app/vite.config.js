import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), {
		name: 'sveltekit-socket-io',
		configureServer(server) {
			const io = new Server(server.httpServer);
			const usernameSocketMap = new Map();
			io.on('connection', (socket) => {


				// Generate a random username and send it to the client to display it
				socket.on('addUser', user => {
					if (user.authenticated) {
						socket.user = user;
						usernameSocketMap.set(user.username, "socket");
					}
				})

				// Receive incoming messages and broadcast them
				socket.on('message', (message) => {
					if (checkAuthentication(socket)) {
						io.emit('message', {
							from: socket.user.username,
							message: message,
							time: new Date().toLocaleString()
						});
					}
					console.log(usernameSocketMap);
				});

				socket.on('disconnect', () => {
					if (socket.user) {
						usernameSocketMap.delete(socket.user.username);
					}
				})
			});

			function checkAuthentication(socket) {
				if (!socket.user?.authenticated) {
					socket.emit('error', 'You are not authenticated');
					socket.disconnect(true);
					return false;
				}
				return true;
			}
		}
	}]

};

export default config;
