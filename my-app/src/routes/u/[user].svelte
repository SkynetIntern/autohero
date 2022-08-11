<script context="module" type="ts">
	//@ts-ignore
	import { Privacy } from '/src/Enums/profileEnums.ts';
	//@ts-ignore
	import { Authorization, ApiRoot } from '/src/auth';
	//@ts-ignore
	export async function load({ session, params }) {
		const sessionUser = session.body.user;
		const username = params.user;

		//get the profile of the parameter user
		const apiResponse = await fetch(`${ApiRoot}/api/profile/getprofile`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization
			},
			body: JSON.stringify({
				username
			})
		});

		const requestBody = await apiResponse.json();
		if (requestBody.status == 200) {
			const selectedPrivacyOption = requestBody.body.profile.privacy;
			const privacyOption = Privacy[selectedPrivacyOption];

			let pageUser = {
				username,
				privacyOption
			};

			// Page Owner
			if (sessionUser.username === pageUser.username) {
				//@ts-ignore
				pageUser.isOwner = true;
			}

			//TODO: check privacy option and return the profile if it is public or is befriended or is the user

			return {
				props: {
					user: sessionUser,
					pageUser
				}
			};
		} else {
			const error: string = 'User not found';
			return {
				props: {
					error,
					user: sessionUser
				}
			};
		}
	}
</script>

<script>
	//@ts-ignore
	export let user, pageUser, error;
	//@ts-ignore
	import Header from '/src/components/header.svelte';
	//@ts-ignore
	import FriendRequest from '/src/components/friendrequest.svelte';
</script>

<svelte:head>
	{#if error}
		<title>Profile not found</title>
	{:else}
		<title>Profile | {pageUser.username}</title>
	{/if}
</svelte:head>

<Header {user} />
{#if error}
	<div class="container">
		<div class="row justify-content-center">
			<div class="col">
				<h1>{error}</h1>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<div class="row">
			<div class="col">
				{#if pageUser.isOwner}
					<div class="row">
						<div class="col">
							<h2>Welcome {pageUser.username} to your profile</h2>
							<p>Your Privacy is set to: {pageUser.privacyOption.description}</p>
						</div>
					</div>
				{:else}
					{#if user.authenticated}
						<FriendRequest {user} {pageUser} />
					{/if}

					{#if pageUser.privacyOption.name == 'Public'}
						<div class="row">
							<div class="col">
								<h2>This is the profile of {pageUser.username}</h2>
							</div>
						</div>
					{/if}
					{#if pageUser.privacyOption.name == 'Private'}
						<div class="row">
							<div class="col">
								<h2>This Profile is Private</h2>
							</div>
						</div>
					{/if}
					{#if pageUser.privacyOption.name == 'Friends only'}
						<div class="row">
							<div class="col">
								<h2>This Profile is only visible to friends</h2>
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}
