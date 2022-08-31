//@ts-ignore
import { bind, init } from 'svelte/internal';
//@ts-ignore
import * as THREE from 'three';
//@ts-ignore
import Stats from 'three/examples/jsm/libs/stats.module';

export default class Game {
    clock: THREE.Clock = new THREE.Clock();
    scene: THREE.Scene = new THREE.Scene();
    delta: number = 0;
    time: number = 0;
    stats: Stats = null;
    frustumSize: number = 5;
    aspect: number = window.innerWidth / window.innerHeight;
    camera: THREE.camera = null;
    renderer: THREE.renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    characterMesh: THREE.mesh = null

    constructor() {
        this.stats = new Stats();
        this.clock = new THREE.Clock();
        this.clock.start();

        this.camera = new THREE.OrthographicCamera(
            (this.frustumSize * this.aspect) / -2,
            (this.frustumSize * this.aspect) / 2,
            this.frustumSize / 2,
            this.frustumSize / -2,
            -10,
            1000
        );

        this.init();
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    changeCharacter(character: {
        color: string;
        name: string;
        level: number;
        expCurrent: number;
        expToNextLevel: number;
    }) {
        const color = character.color.replace('#', '0x')
        this.characterMesh.material.color.setHex(color)
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const renderParent = document.getElementById('three-canvas');
        if (renderParent == null) return;
        renderParent.appendChild(this.renderer.domElement);
        renderParent.appendChild(this.stats.dom);

        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        this.characterMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.characterMesh);

        this.render()
    }

    render() {
        requestAnimationFrame(this.render.bind(this));

        this.delta = this.clock.getDelta();
        this.stats.update();

        //custom loop
        let timeToReach = 1;
        this.time += this.delta;
        if (this.time > timeToReach) {
            this.time = 0;
            //custom loop content here

        }

        this.renderer.render(this.scene, this.camera);
    }

    //resize function
    onWindowResize() {
        this.aspect = window.innerWidth / window.innerHeight;

        this.camera.left = (this.frustumSize * this.aspect) / -2;
        this.camera.right = (this.frustumSize * this.aspect) / 2;
        this.camera.top = this.frustumSize / 2;
        this.camera.bottom = -this.frustumSize / 2;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}