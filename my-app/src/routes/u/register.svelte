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
	import Register from '/src/components/register.svelte';
	//@ts-ignore
	import Header from '/src/components/header.svelte';
	export let user:any;
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
