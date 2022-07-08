<script context="module">
	export async function load({ session }) {
		console.log(session);
		return {
			props: {
				user: session
			}
		};
	}
</script>

<script>
	export let user;
    console.log(user);
	// import { session } from '$app/stores';
	// $session.user;
</script>

<h1 class="text-2xl font-semibold text-center">Hi! You are registered with email {user.email}.</h1>
