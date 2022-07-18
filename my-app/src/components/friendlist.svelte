<script>
	import { onMount } from 'svelte';

	export let user;
	let friends = [];

	async function listFriends() {
		const username = user.username;
		try {
			if (user) {
				const res = await fetch('/auth/friendsget', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username
					})
				});

				const data = await res.json();
				if (res.status == 200) {
					friends = data.friends;
					console.log(friends);
				} else {
					friends = [];
				}
			}
		} catch (err) {}
	}
	async function cancleFriendrequest(friendrequestId) {
		try {
			if (friendrequestId) {
				const res = await fetch('/auth/friendRequestDecline', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						friendrequestId
					})
				});

				const data = await res.json();
				if (res.status == 200) {
					listFriends();
				} else {
				}
			}
		} catch (err) {}
	}
	async function acceptFriendrequest(friendrequestId) {
		try {
			if (friendrequestId) {
				const res = await fetch('/auth/friendRequestAccept', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						friendrequestId
					})
				});

				const data = await res.json();
				if (res.status == 200) {
					listFriends();
				} else {
				}
			}
		} catch (err) {}
	}
	onMount(() => {
		listFriends();
	});
</script>

<div class="friend-list">
	<div class="friend-list-item friend-list-item-pending">
		<a
			class="btn btn-list"
			data-toggle="collapse"
			href="#collapseExample"
			role="button"
			aria-expanded="false"
			aria-controls="collapseExample"
		>
			Pending friendrequests
		</a>
		<div class="collapse" id="collapseExample">
			{#each friends as friend}
				{#if friend.status == 'PENDING'}
					{#if friend.profile.username == user.username}
						<div class="friendrequest pending-friendrequest">
							<div class="pending-friendrequest-text">
								<p class="request-username" data-context-menu-button>
									{friend.friendProfile.username}
								</p>
								<div data-context-menu class="context-menu-container">lol</div>
								<div class="link-decline" on:click={cancleFriendrequest(friend.id)}>
									Cancel friend request
								</div>
							</div>
						</div>
					{:else}
						<div class="friendrequest pending-friendrequest">
							<div class="pending-friendrequest-text">
								<p class="request-username" data-context-menu-button>
									{friend.friendProfile.username}
								</p>
								<div data-context-menu class="context-menu-container">lol</div>
								<div class="link-decline" on:click={cancleFriendrequest(friend.id)}>
									Decline friendrequest
								</div>
								<div class="link-accept" on:click={acceptFriendrequest(friend.id)}>
									Accept friendrequest
								</div>
							</div>
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
	<div class="friend-list-item friend-list-item-accepted">
		<h3>Friends</h3>
		{#each friends as friend}
			{#if friend.status == 'ACCEPTED'}
				<div class="friendrequest accepted-friendrequest">
					<p class="request-username" data-context-menu-button>{friend.friendProfile.username}</p>
					<div data-context-menu class="context-menu-container">lol</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
