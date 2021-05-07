import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Events from './Events';

/**
 * Setup the mouse controls
 */
export default class Controls {
    constructor(camera, renderer, worldWidth, worldDepth) {
        this.controls = new OrbitControls(camera.camera, renderer.domElement);
        this.controls.minPolarAngle = 0.785398; // 45 deg
        this.controls.maxPolarAngle = 0.785398; // 45 deg
        this.controls.screenSpacePanning = false;

        Events.listen('controls', (status) => {
            this.controls.enabled = status;
        });
    }
}
