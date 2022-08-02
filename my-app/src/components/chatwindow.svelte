<script type="ts">
	import { onMount } from 'svelte';
	//@ts-ignore
	import { io } from '/src/assets/js/socket/socketinit.js';

	export let user: any;
	export let friendUser: any;
	export let friendlistId: number;
	export let dataEx: any;
	export let loopIndex: number;

	onMount(() => {
		io.on('privateMessage', (data: any) => {
			drawMessage(data);
		});

		if (dataEx) {
			drawMessage(dataEx);
		} else {
			// sendMessage();
		}

		//add event listener to send button
		document
			.querySelector('#sendprivatemsg' + loopIndex)
			?.addEventListener('click', sendPrivateMessage);
	});

	async function sendPrivateMessage() {
		const message = 'Hello World!';
		let from = user;
		let to = friendUser;
		let room = friendlistId;
		const data = {
			from,
			to,
			room,
			message
		};
		io.emit('privateMessage', data); // Send the message
	}

	async function drawMessage(data: any) {
		if (!data?.from) return;
		//check if message is from sender
		const isSender = data.from.username === user.username;
		const message = data.message;
		const success = data.success;

		if (success) {
			//create new message element and append to messageWindow bottom
			const messageElement = document.createElement('div');
			const messageWindow = document.querySelector('#message-window' + loopIndex);
			console.log(loopIndex);

			messageElement.classList.add('message');
			messageElement.classList.add(isSender ? 'sender' : 'receiver');
			messageElement.innerHTML = message;

			messageWindow.appendChild(messageElement);
			messageWindow.scrollTop = messageWindow.scrollHeight;
		}
	}
</script>

<div class="friend-list">
	<h1>{friendUser.username}</h1>
	<div id="message-window{loopIndex}" />
	<div class="message-input">
		<input type="text" />
		<button id="sendprivatemsg{loopIndex}">send</button>
	</div>
</div>
