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
	import Login from '/src/components/login.svelte';
    import Register from '/src/components/register.svelte';
    import Logout from '/src/components/logout.svelte';
	export let user;
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>
<body>
	<Header {user}/>
	<!-- <div class="row justify-content-center mt-5">
		<div class="col-6">
			<Login {user} />
		</div>
	</div>
    <div class="row justify-content-center mt-5">
		<div class="col-6">
			<Register {user} />
		</div>
	</div>
	<div class="row justify-content-center mt-5">
		<div class="col-6">
			<Logout {user} />
		</div>
	</div> -->
	<script defer src="/src/assets/js/bootstrap/jquery.js"></script>
	<script defer src="/src/assets/js/bootstrap/bootstrap.min.js"></script>
	
</body>
