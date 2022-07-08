<script>
	import Header from '/src/components/header.svelte';
	import Login from '/src/components/login.svelte';
    import Register from '/src/components/register.svelte';
</script>

<svelte:head>
	<title>Autohero | Plan your path</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="/src/assets/css/bootstrap/bootstrap.min.css" />
	<link rel="stylesheet" href="/src/assets/css/style.css" />
</svelte:head>
<body>
	<div class="row justify-content-center mt-5">
		<div class="col-6">
			<Login />
		</div>
	</div>
    <div class="row justify-content-center mt-5">
		<div class="col-6">
			<Register />
		</div>
	</div>
</body>
