<script>
	import Logout from './logout.svelte';

	import LoginWindow from '/src/components/loginWindow.svelte';
	export let user;

	if (user) {
	}

</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark header-navbar justify-content-between">
	<a class="navbar-brand" href="#">Navbar</a>
	<div class="dropdown-c" data-dropdown>
		<button data-dropdown-button class="link btn btn-default"
			>{#if user.authenticated}
				Account
			{:else}
				Login
			{/if}</button
		>
		<div class="dropdown-menu-c right bottom">
			{#if user.authenticated}
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="/u/{user.username}">Your Profile</a>
				<Logout {user} />
			{:else}
				<div class="login-window">
					<LoginWindow {user} />
				</div>
			{/if}
		</div>
	</div>
</nav>
