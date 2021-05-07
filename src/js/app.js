import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';

import Camera from './util/Camera';
import Controls from './util/Controls';
import Scene from './util/Scene';
import Debug from './util/Debug';

let container, stats;

let camera, scene, renderer;

const worldWidth = 32, worldDepth = 32;

init();
animate();

function init() {

    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    camera = new Camera();
    new Controls(camera, renderer, worldWidth, worldDepth);
    scene = new Scene(camera);

    stats = new Stats();
    container.appendChild(stats.dom);

    new Debug();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render() {
    renderer.render(scene.scene, camera.camera);
}
