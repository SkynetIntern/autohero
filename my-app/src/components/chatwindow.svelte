<script type="ts">
	import { onMount } from 'svelte';
	//@ts-ignore
	import { io } from '/src/assets/js/socket/socketinit.js';
	//@ts-ignore
	import { IsObjEmpty } from '/src/lib.js';
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
		document.querySelector('#message-input' + loopIndex)?.addEventListener('keyup', (e: any) => {
			if (e.keyCode === 13) {
				sendPrivateMessage();
			}
		});
	});

	async function sendPrivateMessage() {
		const input = document.querySelector('#message-input' + loopIndex);
		if (input) {
			const message = input.value ?? '';
			if (message.length < 1) return;
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
			input.value = '';
		}
	}

	async function drawMessage(data: any) {
		if (IsObjEmpty(data)) return;

		//check if success is true if not user is probably not logged in
		const success = data.success;
		if (success) {
			createChatMessage(data, false);
		} else {
			console.log(data);
			createChatMessage(data, true);
		}
	}

	function createChatMessage(data: any, isError: boolean = false) {
		//check if message is from sender
		let isSender = data.from.username === user.username;
		let message = data.message;
		let time = data.time;
		//create new message element and append to messageWindow bottom
		const messageElement = document.createElement('div');
		const messageWindow = document.querySelector('#message-window' + loopIndex);

		messageElement.classList.add('message');

		if (isError) {
			isSender = true;
			message = data.message;
			messageElement.classList.add('error');
		}

		messageElement.classList.add(isSender ? 'sender' : 'receiver');
		messageElement.innerText = message;

		messageWindow?.prepend(messageElement);

		if (isError) {
			//create error elm
			const errorElement = document.createElement('div');
			errorElement.classList.add('error-message');
			errorElement.innerText = data.errorMessage;
			messageElement.appendChild(errorElement);
		}

		//create span element for message time and username
		const messageInfoElement = document.createElement('div');
		messageInfoElement.classList.add('message-info');
		const timeElement = document.createElement('span');
		const usernameElement = document.createElement('span');
		timeElement.classList.add('time');
		usernameElement.classList.add('username');
		timeElement.innerHTML = time;
		usernameElement.innerHTML = isSender ? 'You' : data.from.username;
		messageInfoElement.prepend(timeElement);
		messageInfoElement.prepend(usernameElement);
		messageElement.prepend(messageInfoElement);
		//@ts-ignore
		messageWindow.scrollTop = messageWindow.scrollHeight;
	}
</script>

<div class="friend-list">
	<h1>{friendUser.username}</h1>
	<div class="message-window" id="message-window{loopIndex}" />
	<div class="message-input form-group">
		<input class="form-control" id="message-input{loopIndex}" type="text" />
		<button class="btn btn-default" id="sendprivatemsg{loopIndex}">send</button>
	</div>
</div>
