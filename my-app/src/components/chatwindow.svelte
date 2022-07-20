<script>
	import { onMount } from 'svelte';
	import { io } from '/src/assets/js/socket/socketinit.js';

	export let user;
	export let friendUser;
	export let friendlistId;
	export let dataEx;

	onMount(() => {
		io.on('privateMessage', (data) => {
			drawMessage(data);
		});

		if (dataEx) {
			drawMessage(dataEx);
		} else {
			// sendMessage();
		}
	});

	async function sendPrivateMessage2() {
		console.log('sendMessage1');
		// const message = 'Hello World!';
		// let from = user;
		// let to = friendUser;
		// let room = friendlistId;
		// const data = {
		// 	from,
		// 	to,
		// 	room,
		// 	message
		// };
		// io.emit('privateMessage', data); // Send the message
	}

	async function drawMessage(data) {
		console.log(data);
	}
</script>

<div class="friend-list">
	<h1>{friendUser.username}</h1>
	<div id="sendprivatemsg">
		send
	</div>
</div>
