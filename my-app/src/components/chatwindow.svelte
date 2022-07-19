<script>
	import { onMount } from 'svelte';
	import { io } from '/src/assets/js/socket/socketinit.js';

	export let user;
	export let friendUser;

	onMount(() => {
		io.on('message', (message) => {
			// Listen to the message event
			console.log(message);
		});

		sendMessage();
	});

	function sendMessage() {
		const message = 'Hello World!';
		io.emit('message', message); // Send the message
	}
</script>

<div class="friend-list">
	<h1>{friendUser.username}</h1>
</div>
