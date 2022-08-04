<script type="ts">
	import Logout from './logout.svelte';
	//@ts-ignore
	import Dragbar from '/src/components/dragbar.svelte';
	//@ts-ignore
	import LoginWindow from '/src/components/loginWindow.svelte';
	//@ts-ignore
	import Friendlist from '/src/components/friendlist.svelte';
	//@ts-ignore
	import Chatwindow from '/src/components/chatwindow.svelte';
	import { onMount } from 'svelte';
	//@ts-ignore
	import { io } from '/src/assets/js/socket/socketinit.js';
	import Friendrequest from './friendrequest.svelte';
	export let user:any;

	let chatwindows:any[] = [];
	let counter = 0;
	function addChatwindows(friendUser:any, friendlistId:number, data = {}) {
		counter++;
		let chatwindow = {
			index: counter,
			friendUser,
			friendlistId,
			data
		};
		//check if chatwindow already exists
		let chatwindowExists = false;
		chatwindows.forEach((cw) => {
			if (cw.friendlistId == friendlistId) {
				chatwindowExists = true;
			}
		});
		if (!chatwindowExists) {
			chatwindows = [...chatwindows, chatwindow];
		}
	}

	function updateDropdownMenu() {
		document.querySelectorAll('.dropdown-menu-c.top').forEach((dropdown) => {
			//get height of dropdown menu
			//@ts-ignore
			const buttonWidth = dropdown?.parentElement?.querySelector('.link')?.offsetWidth;
			//@ts-ignore
			const dropdownHeight = dropdown.offsetHeight;
			//@ts-ignore
			const dropdownWidth = dropdown.offsetWidth - buttonWidth;
			//@ts-ignore
			dropdown.style.transform = `translate(-${dropdownWidth}px, -${dropdownHeight}px)`;
		});
		document.querySelectorAll('.dropdown-menu-c.bottom').forEach((dropdown) => {
			//get height of dropdown menu
			//@ts-ignore
			const buttonWidth = dropdown.parentElement?.querySelector('.link').offsetWidth;
			//@ts-ignore
			const dropdownHeight = dropdown.offsetHeight;
			//@ts-ignore
			const dropdownWidth = dropdown.offsetWidth - buttonWidth;
			//@ts-ignore
			dropdown.style.transform = `translateX(-${dropdownWidth}px)`;
		});
	}
	onMount(() => {
		updateDropdownMenu();
		io.on('privateMessage', (data:any) => {
			if (chatwindows.length <= 0) {
				//create new chatwindow and add data to it for the first message
				addChatwindows(data.from, data.room, data);
			} else {
				chatwindows.forEach((chatwindow) => {
					if (chatwindow.friendlistId === data.room) {
						//chatwindow already exists
					} else {
						//create new chatwindow and add data to it for the first message
						addChatwindows(data.from, data.room, data);
					}
				});
			}
		});
	});
</script>

<div class="footer-list justify-content-between">
	<div />
	<div class="d-flex">
		<div class="chat-window-tab-list">
			{#each chatwindows as chatwindow}
				<div class="dropdown-c" data-dropdown>
					<button data-dropdown-button on:click={updateDropdownMenu} class="link btn btn-default"
						>{chatwindow.friendUser.username}</button
					>
					<div
						context-menu-parent-container="contextmenu1"
						class="dropdown-menu-c top"
					>
						<Dragbar dragAble={true} pinAble={true} title={chatwindow.friendUser.username} id="chat{chatwindow.index}" />
						<Chatwindow
							{user}
							friendUser={chatwindow.friendUser}
							friendlistId={chatwindow.friendlistId}
							dataEx={chatwindow.data}
							loopIndex={chatwindow.index}
						/>
					</div>
				</div>
			{/each}
		</div>
		<div class="dropdown-c" data-dropdown>
			<button data-dropdown-button class="link btn btn-default">Friends</button>
			<div
				context-menu-parent-container="contextmenu1"
				class="dropdown-menu-c top"
			>
				<Dragbar dragAble={true} pinAble={true} title={"Friendlist"} id="friendlist" />
				<Friendlist
					addChatwindows={(friendUser, friendlistid) => addChatwindows(friendUser, friendlistid)}
					{user}
				/>
			</div>
		</div>
	</div>
</div>
