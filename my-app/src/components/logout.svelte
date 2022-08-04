<script type="ts">
    export let user:any;
	async function logout() {
        if (user) {
            
            const email = user.email;
            const sessionid = user.sessionid;

			const res = await fetch('/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					sessionid
				})
			});
			location.reload();
        }
	}
</script>
<button class="btn btn-danger" on:click={logout}>Logout</button>