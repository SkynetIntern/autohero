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

	onMount(() => {
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
			initThreeScene();
		}
	});
</script>

<div id="three-canvas">
	<div class="character-list-wrapper">
		<div id="character-list">
			<div class="character">
				<div class="character-level">20</div>
				<div class="character-name">Character Name</div>
			</div>
		</div>
	</div>
</div>
