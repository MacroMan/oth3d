import * as THREE from 'three';
import Events from '../util/Events';
import Storage from '../util/Storage';

export default class Render {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container = document.getElementById('container');
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => this.onWindowResize());

        Storage.set('render', this);

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.renderer.render(Storage.get('scene').scene, Storage.get('camera').camera);
        Events.fire('animate');
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
