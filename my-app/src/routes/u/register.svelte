<script context="module" type="ts">
	//@ts-ignore
	export async function load({ session }) {
		return {
			props: {
				user: session.body.user
			}
		};
	}
</script>

<script type="ts">
	//@ts-ignore
	import Register from '$lib/components/register.svelte';
	//@ts-ignore
	import Header from '$lib/components/header.svelte';
	export let user: any;
	if (user) {
	}
</script>

<svelte:head>
	<title>Register now</title>
</svelte:head>

<Header {user} />
<Register {user} />
