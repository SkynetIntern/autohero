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
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="/src/assets/css/bootstrap/bootstrap.min.css" />
	<link rel="stylesheet" href="/src/assets/css/style.css" />
</svelte:head>
<body>
	<Header {user}/>
	<Register {user} />
</body>
