<script>
	import { io, AddUser } from '/src/assets/js/socket/socketinit.js';
    import { onMount } from 'svelte';

	export let user;

	onMount(() => {
      
		if (user.authenticated) {
			AddUser(user);
		}
	});
</script>
