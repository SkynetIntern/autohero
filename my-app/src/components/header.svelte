<script>
	import Logout from './logout.svelte';

	import LoginWindow from '/src/components/loginWindow.svelte';
	export let user;

	if (user) {
	}

	function loginNavDropdown() {
		document.querySelector(`[aria-labelledby="${this.id}"]`).classList.toggle('show');
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark header-navbar">
	<a class="navbar-brand" href="#">Navbar</a>
	<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		data-target="#navbarNavDropdown"
		aria-controls="navbarNavDropdown"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="navbar-toggler-icon" />
	</button>
	<div class="collapse navbar-collapse" id="navbarNavDropdown">
		<ul class="navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item dropdown user-dropdown">
				<button
					class="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					on:click={loginNavDropdown}
				>
					{#if user.authenticated}
						Account
					{:else}
						Login
					{/if}
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{#if user.authenticated}
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="/u/{user.username}">Your Profile</a>
						<Logout {user}/>
					{:else}
						<div class="login-window">
							<LoginWindow {user} />
						</div>
					{/if}
				</div>
			</li>
		</ul>
	</div>
</nav>
