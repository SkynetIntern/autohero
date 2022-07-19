<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.body.user
			}
		};
	}
</script>

<script>
	import Header from '/src/components/header.svelte';
	import Footerlist from '/src/components/footerlist.svelte';
	import Socket from '/src/components/socketio.svelte';
	export let user;
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>
<body>
	<Socket {user} />
	<Header {user} />
	{#if user.authenticated}
		<Footerlist {user} />
	{/if}
</body>
