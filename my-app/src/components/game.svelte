<script type="ts">
	//@ts-ignore
	import { io } from '/src/assets/js/socket/socketinit.js';
	import { onMount } from 'svelte';
	//@ts-ignore
	import * as THREE from 'three';

	export let user: { email: string; username: string; authenticated: boolean };

	onMount(() => {
		function initThreeScene() {
			document.body.style.overflow = 'hidden';
			const frustumSize = 5;
			let aspect = window.innerWidth / window.innerHeight;

			const scene = new THREE.Scene();

			const camera = new THREE.OrthographicCamera(
				frustumSize * aspect / -2,
				frustumSize * aspect / 2,
				frustumSize / 2,
				frustumSize / -2,
				0.1,
				100
			);
			//rotate camera 90 degrees
			camera.rotation.x = 90;
			camera.position.z = 1;
			//set background transparent
			const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

			function render() {
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
