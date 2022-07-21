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
		io.on('privateMessage', (data:any) => {
			drawMessage(data);
		});

		if (dataEx) {
			drawMessage(dataEx);
		} else {
			// sendMessage();
		}

		//add event listener to send button
		document.querySelector('#sendprivatemsg' + loopIndex)?.addEventListener('click', sendPrivateMessage);
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

	async function drawMessage(data:any) {
		console.log(data);
	}
</script>

<div class="friend-list">
	<h1>{friendUser.username}</h1>
	<button id="sendprivatemsg{loopIndex}">
		send
	</button>
</div>
