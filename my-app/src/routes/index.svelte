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
	export let user;
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>
<body>
	<Header {user} />
	{#if user.authenticated}
		<Footerlist {user} />
	{/if}

	<script defer src="/src/assets/js/bootstrap/jquery.js"></script>
	<script defer src="/src/assets/js/bootstrap/bootstrap.min.js"></script>
</body>
