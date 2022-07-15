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
	async function cancleFriendrequest(friendrequestId){
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
	async function acceptFriendrequest(friendrequestId){
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

<div class="friend-container">
	<div class="friend-list">
		<div class="friend-list-header">
			<h3>Friends</h3>
		</div>
		<div class="friend-list-body">
			<div class="friend-list-item friend-list-item-pending">
				<h3>Pending friendrequests</h3>
				{#each friends as friend}
					<div class="friendrequest pending-friendrequest">
						{#if friend.status == 'PENDING'}
							<div class="pending-friendrequest-text">
								<p>{friend.friendProfile.username}</p>
								{#if friend.profile.username == user.username}
									<i>request sent</i>
									<button on:click={cancleFriendrequest(friend.id)}>cancle friendrequest</button>
									{:else}
									<i>request received</i>
									<button on:click={cancleFriendrequest(friend.id)}>decline friendrequest</button>
									<button on:click={acceptFriendrequest(friend.id)}>accept friendrequest</button>
								{/if}
								<p></p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="friend-list-item friend-list-item-accepted">
				<h3>Friends</h3>
				{#each friends as friend}
					<div class="friendrequest accepted-friendrequest">
						{#if friend.status == 'ACCEPTED'}
							<div class="pending-friendrequest-text">
								<p>{friend.friendProfile.username}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
			
		</div>
	</div>
</div>
