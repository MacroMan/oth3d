// import Unit from '../Util/Unit';
import { PerspectiveCamera } from "three";

/**
 * Set up the camera
 */
export default class {
    camera: PerspectiveCamera;

    constructor () {
        this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
        // this.camera.position.y = Unit.tileToPixel(5);

        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    resize () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
