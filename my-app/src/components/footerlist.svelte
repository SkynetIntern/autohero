<script>
	import Logout from './logout.svelte';
	import Dragbar from '/src/components/dragbar.svelte';
	import LoginWindow from '/src/components/loginWindow.svelte';
	import Friendlist from '/src/components/friendlist.svelte';
	import { onMount } from 'svelte';
	export let user;

	if (user) {
	}

	onMount(() => {
		document.querySelectorAll('.dropdown-menu-c.top').forEach((dropdown) => {
			//get height of dropdown menu
			const buttonWidth = dropdown.parentElement?.querySelector('.link').offsetWidth;
			const dropdownHeight = dropdown.offsetHeight;
			const dropdownWidth = (dropdown.offsetWidth) - buttonWidth;
			dropdown.style.transform = `translate(-${dropdownWidth}px, -${dropdownHeight}px)`;
		});
		document.querySelectorAll('.dropdown-menu-c.bottom').forEach((dropdown) => {
			//get height of dropdown menu
			const buttonWidth = dropdown.parentElement?.querySelector('.link').offsetWidth;
			const dropdownHeight = dropdown.offsetHeight;
			const dropdownWidth = dropdown.offsetWidth - buttonWidth;
			dropdown.style.transform = `translateX(-${dropdownWidth}px)`;
		});
	});
</script>

<div class="footer-list justify-content-between">
	<div />
	<div>
		<div class="dropdown-c" data-dropdown>
			<button data-dropdown-button class="link btn btn-default">Friends</button>
			<div data-dragable data-pinable class="dropdown-menu-c top">
				<Dragbar />
				<Friendlist {user} />
			</div>
		</div>
	</div>
</div>
