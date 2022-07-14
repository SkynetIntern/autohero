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
	import Register from '/src/components/register.svelte';
	import Header from '/src/components/header.svelte';
	export let user;
	if (user) {
	}
</script>

<svelte:head>
	<title>Register now</title>
</svelte:head>
<body>
	<Header {user}/>
	<Register {user} />
</body>
