<script type="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let error:any = undefined;

	async function login() {
		try {
			const res = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			if (res.ok) {
				location.reload()
			} else {
				const data = await res.json();
				error = data.message;
			}
		} catch (err) {}
	}
</script>

<div>
	<div class="panel panel-default">
		{#if error}
			<div class="alert alert-danger">
				{error}
			</div>
		{/if}
		<div class="panel-body">
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" bind:value={email} placeholder="Email" />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" bind:value={password} placeholder="Password" />
			</div>
			<button type="submit" on:click={login} class="btn btn-default w-100 mb-2">Login</button>
			<a class="register-link" href="/u/register">Register here</a>
		</div>
	</div>
</div>
