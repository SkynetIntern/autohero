<script type="ts">
	//@ts-ignore
	import { io } from '$lib/assets/js/socket/socketinit.js';
	import { onMount } from 'svelte';
import Game from '../assets/js/game/game';

	export let user: { email: string; username: string; authenticated: boolean };
	let characters: { name: string; level: number; expCurrent: number; expToNextLevel: number }[] =
		[];
	let characterSelected: number = 0;

	async function getCharacters() {
		try {
			const res = await fetch('/auth/getCharacters', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
				// body: JSON.stringify({
				// 	username: user.username
				// })
			});

			if (res.ok) {
				const data = await res.json();
				return data;
			} else {
				throw new Error('Something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	}

	function onCharacterSelect(selectedId: number, event: EventListener) {
		selectCharacter(selectedId,event.target)
	}

	function selectCharacter(selectedId: number, element: Element){
		if (selectedId == characterSelected) return;
		characterSelected = selectedId;
		document.querySelectorAll('.character').forEach((elm) => {
			elm.classList.remove('active');
		});
		element.classList.add('active');
		io.emit('changeSelectedCharacter', { selectedId, characters });
	}

	function getCharacter() {
		io.emit('getCharacter', {});
		io.on(
			'getCharacter',
			(character: { name: string; level: number; expCurrent: number; expToNextLevel: number }) => {
				console.log(character);
			}
		);
	}

	onMount(async () => {
		function initThreeScene() {
			document.body.style.overflow = 'hidden';
			let game = new Game();
		}

		if (user.authenticated) {
			const data = await getCharacters();
			if (data) {
				characters = data.characters;
			}

			initThreeScene();
		}
	});
</script>

<div id="three-canvas">
	<div class="character-list-wrapper">
		<div id="character-list">
			{#each characters as character, i}
				<div class="character" on:click={(event) => onCharacterSelect(i, event)}>
					<div class="character-level">{character.level}</div>
					<div class="character-name">{character.name}</div>
				</div>
			{/each}
		</div>
		<div class="create-character">
			<div class="create-character-btn">Create Character</div>
		</div>
	</div>
</div>
