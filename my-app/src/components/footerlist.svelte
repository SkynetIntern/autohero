<script>
	import Logout from './logout.svelte';

	import LoginWindow from '/src/components/loginWindow.svelte';
    import Friendlist from '/src/components/friendlist.svelte';
	export let user;

	if (user) {
	}
</script>

<div class="footer-list justify-content-between">
	<div />
	<div>
		<div class="dropdown-c" data-dropdown>
			<button data-dropdown-button class="link btn btn-default">Friends</button>
			<div class="dropdown-menu-c right top">
				<Friendlist {user}/>
			</div>
		</div>
	</div>
	<script>
		document.querySelectorAll('.dropdown-menu-c.top').forEach((dropdown) => {
			//get height of dropdown menu
			const dropdownHeight = dropdown.offsetHeight;
			dropdown.style.transform = `translateY(-${dropdownHeight}px)`;
		});
	</script>
</div>
