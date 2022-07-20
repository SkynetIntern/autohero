import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import SocketConnection from './socket.js'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), {
		name: 'sveltekit-socket-io',
		configureServer(server) {
			const io = new Server(server.httpServer);
			let socketConnection = new SocketConnection(io);
		}
	}]

};

export default config;
