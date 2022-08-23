<script type="ts">
	export let user:any;
	export let pageUser:any;
	async function friendrequest() {
		if (user) {
			const receiverUsername = pageUser.username;

			const res = await fetch('/auth/friendRequest', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					receiverUsername
				})
			});
		}
	}
</script>

<button class="btn btn-danger" on:click={friendrequest}>Send friend request</button>
