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
			renderParent.appendChild(renderer.domElement);
			

			const geometry = new THREE.SphereGeometry(0.2, 4, 2);
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
			
			const cubes = [];
			let counter = 0;
			//create cube in grid position
			for (let i = 0; i < 20; i++) {
				for (let j = 0; j < 20; j++) {
					counter++;
					let cube;
					//copy material
					let newMat = material.clone();
					cube = new THREE.Mesh(geometry, newMat);
					cube.material.color.toLerp=new THREE.Color(0xffffff);
					
					cube.position.x = i * 0.5 - (10 * 1) / 2;
					cube.position.yOffset = j * 0.5 - (10 * 1) / 2;
					cubes.push(cube);
					scene.add(cube);
				}
			}
			let speed = 0.25;
			let speedRot = 1;
			function render() {
				delta = clock.getDelta();

				cubes.forEach((cube) => {
					
					cube.rotation.z += 0.01 * speedRot;
					cube.rotation.y += 0.01 * speedRot;
					cube.position.y =
						cube.position.yOffset +
						Math.sin(time * 1 * Math.PI) * Math.sin(time * 2 * Math.PI) * 1 * speed;
				});

				//custom loop
				let timeToReach = 1;
				time += delta;
				if (time > timeToReach) {
					time = 0;
					cubes.forEach((cube) => {
						cube.material.color.toLerp = new THREE.Color(Math.random() * 0xffffff);
					});
				}

				cubes.forEach((cube) => {
					cube.material.color.lerp(cube.material.color.toLerp, 1 * delta);
				});

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

<div id="three-canvas" />
