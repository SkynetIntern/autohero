<script>
	export let user;
	export let pageUser;
	async function friendrequest() {
		if (user) {
			const senderUsername = user.username;
			const receiverUsername = pageUser.username;

			const res = await fetch('/auth/friendRequest', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					senderUsername,
					receiverUsername
				})
			});
		}
	}
</script>

<button class="btn btn-danger" on:click={friendrequest}>Send friend request</button>
