<script type="ts">
	//@ts-ignore
	import { io } from '/src/assets/js/socket/socketinit.js';
	import { onMount } from 'svelte';
	//@ts-ignore
	import * as THREE from 'three';
	//@ts-ignore
	import { Clock } from 'three';

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
				frustumSize * aspect / -2,
				frustumSize * aspect / 2,
				frustumSize / 2,
				frustumSize / -2,
				-10,
				1000
			);

			//set background transparent
			const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			//wireframe mode
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
			
			function render() {
				delta = clock.getDelta();
				
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				

				//custom loop 
				let timeToReach = 0.5
				time += delta;
				if (time > timeToReach) {
					time = 0;
					cube.material.color.setHex(Math.random() * 0xffffff);				
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
			console.log('init three');
			
		}
	});
</script>
