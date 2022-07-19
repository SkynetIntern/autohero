<script>
	import Logout from './logout.svelte';
	import Dragbar from '/src/components/dragbar.svelte';
	import LoginWindow from '/src/components/loginWindow.svelte';
	import Friendlist from '/src/components/friendlist.svelte';
	import Chatwindow from '/src/components/chatwindow.svelte';
	import { onMount } from 'svelte';
	export let user;

	if (user) {
	}

	let chatwindows = [];
	let counter = 0;
	function addChatwindows(friendUser) {
		counter++;
		let chatwindow = {
			index: counter,
			friendUser
		};
		chatwindows = [...chatwindows, chatwindow];
	}

	function updateDropdownMenu() {
		document.querySelectorAll('.dropdown-menu-c.top').forEach((dropdown) => {
			//get height of dropdown menu
			const buttonWidth = dropdown.parentElement?.querySelector('.link').offsetWidth;
			const dropdownHeight = dropdown.offsetHeight;
			const dropdownWidth = dropdown.offsetWidth - buttonWidth;
			dropdown.style.transform = `translate(-${dropdownWidth}px, -${dropdownHeight}px)`;
		});
		document.querySelectorAll('.dropdown-menu-c.bottom').forEach((dropdown) => {
			//get height of dropdown menu
			const buttonWidth = dropdown.parentElement?.querySelector('.link').offsetWidth;
			const dropdownHeight = dropdown.offsetHeight;
			const dropdownWidth = dropdown.offsetWidth - buttonWidth;
			dropdown.style.transform = `translateX(-${dropdownWidth}px)`;
		});
	}

	onMount(() => {
		updateDropdownMenu();
	});
</script>

<div class="footer-list justify-content-between">
	<div />
	<div class="d-flex">
		<div class="chat-window-tab-list">
			{#each chatwindows as chatwindow}
				<div class="dropdown-c"  data-dropdown>
					<button data-dropdown-button on:click={updateDropdownMenu} class="link btn btn-default">{chatwindow.friendUser.username}</button>
					<div
						data-dragable
						data-pinable
						context-menu-parent-container="contextmenu1"
						class="dropdown-menu-c top"
						
					>	<Dragbar id="chat{chatwindow.index}"/>
						<Chatwindow {user} friendUser={chatwindow.friendUser} />
					</div>
				</div>
			{/each}
		</div>
		<div class="dropdown-c" data-dropdown>
			<button data-dropdown-button class="link btn btn-default">Friends</button>
			<div
				data-dragable
				data-pinable
				context-menu-parent-container="contextmenu1"
				class="dropdown-menu-c top"
	
			>
				<Dragbar id="friendlist"/>
				<Friendlist addChatwindows={(friendUser) => addChatwindows(friendUser)} {user} />
			</div>
		</div>
	</div>
</div>
