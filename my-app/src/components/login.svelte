<script>
	import { goto } from '$app/navigation';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let error = undefined;

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
				goto('/');
			} else {
                const data = await res.json();
				error = data.message;
			}
		} catch (err) {
			
		}
	}
</script>

<div>
	<div class="container">
		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Login</h3>
					</div>
                    <div>
                        {#if error}
                            {error}
                        {/if}
                    </div>
					<div class="panel-body">
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" class="form-control" bind:value={email} placeholder="Email" />
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input
								type="password"
								class="form-control"
								bind:value={password}
								placeholder="Password"
							/>
						</div>
						<button type="submit" on:click={login} class="btn btn-default">Login</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
