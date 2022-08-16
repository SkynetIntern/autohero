<script type="ts">
	//@ts-ignore
	import { io, AddUser } from '$lib/assets/js/socket/socketinit.js';
    import { onMount } from 'svelte';

	export let user:any;

	onMount(() => {
      
		if (user.authenticated) {
			AddUser(user);
		}
	});
</script>
