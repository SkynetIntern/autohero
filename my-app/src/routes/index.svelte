<script context="module" type="ts">
	//@ts-ignore
	export async function load({ session }) {
		return {
			props: {
				user: session.body.user
			}
		};
	}
</script>

<script type="ts">
	//@ts-ignore
	import Header from '$lib/components/header.svelte';
	//@ts-ignore
	import Footerlist from '$lib/components/footerlist.svelte';
	//@ts-ignore
	import Socket from '$lib/components/socketio.svelte';
	//@ts-ignore
	import Game from '$lib/components/game.svelte';

	export let user: any;
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>
<Header {user} />

<Socket {user} />
{#if user.authenticated}
	<Game {user} />
{:else}
<h2>Awesome Site</h2>
<p>Register now !</p>
{/if}
{#if user.authenticated}
	<Footerlist {user} />
{/if}
