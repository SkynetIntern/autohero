<script type="ts">
	//@ts-ignore
	import { io } from '$lib/assets/js/socket/socketinit.js';
	import { onMount } from 'svelte';
	//@ts-ignore
	import * as THREE from 'three';
	//@ts-ignore
	import { Clock } from 'three';
	import Stats from 'three/examples/jsm/libs/stats.module';

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
			const frustumSize = 5;
			let aspect = window.innerWidth / window.innerHeight;
			const clock = new THREE.Clock();
			const scene = new THREE.Scene();
			let delta = 0;
			let time = 0;

			const camera = new THREE.OrthographicCamera(
				(frustumSize * aspect) / -2,
				(frustumSize * aspect) / 2,
				frustumSize / 2,
				frustumSize / -2,
				-10,
				1000
			);

			//set background transparent
			const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			const renderParent = document.getElementById('three-canvas');
			if (renderParent == null) return;

			renderParent.appendChild(renderer.domElement);
			//@ts-ignore
			let stats = new Stats();
			renderParent.appendChild(stats.dom);

			function render() {
				delta = clock.getDelta();
				stats.update();

				//custom loop
				let timeToReach = 1;
				time += delta;
				if (time > timeToReach) {
					time = 0;
				}

				requestAnimationFrame(render);
				renderer.render(scene, camera);
			}

			//resize function
			function onWindowResize() {
				aspect = window.innerWidth / window.innerHeight;

				camera.left = (frustumSize * aspect) / -2;
				camera.right = (frustumSize * aspect) / 2;
				camera.top = frustumSize / 2;
				camera.bottom = -frustumSize / 2;

				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}
			window.addEventListener('resize', onWindowResize, false);

			render();
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
