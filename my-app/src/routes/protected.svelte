<script>
	import LoginWindow from "/src/components/loginWindow.svelte";
	export let user;
    if (user) {
		
	}

</script>
<LoginWindow {user} />
{#if user}
<h1 class="text-2xl font-semibold text-center">Hi! You are registered with email {user.email}.</h1>
{:else}
<h1 class="text-2xl font-semibold text-center">Unauthorized</h1>
{/if}