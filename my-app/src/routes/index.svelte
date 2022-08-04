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
	import Header from '/src/components/header.svelte';
	//@ts-ignore
	import Footerlist from '/src/components/footerlist.svelte';
	//@ts-ignore
	import Socket from '/src/components/socketio.svelte';
	//@ts-ignore
	import Game from '/src/components/game.svelte';

	export let user: any;
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>

<Socket {user} />
{#if user.authenticated}
	<Game {user} />
{:else}{/if}
<Header {user} />
{#if user.authenticated}
	<Footerlist {user} />
{/if}
