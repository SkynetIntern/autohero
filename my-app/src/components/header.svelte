<script type="ts">
	import Logout from './logout.svelte';
	//@ts-ignore
	import LoginWindow from '/src/components/loginWindow.svelte';
	import { onMount } from 'svelte';
	export let user: any;

	if (user) {
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark header-navbar justify-content-between">
	<a class="navbar-brand" href="/">Home</a>
	<div class="dropdown-c" data-dropdown>
		<button data-dropdown-button class="link btn btn-default"
			>{#if user.authenticated}
				Account
			{:else}
				Login
			{/if}</button
		>
		<div class="dropdown-menu-c bottom right">
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
