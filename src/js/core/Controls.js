import Events from '../util/Events';
import Storage from '../util/Storage';
import {MapControls} from '../util/OrbitControls';
import Config from '../Config';

/**
 * Setup the mouse controls
 */
export default class Controls {
    constructor() {
        this.controls = new MapControls(Storage.get('camera').camera, Storage.get('render').renderer.domElement);
        // this._polarAngle = this.controls.minPolarAngle = this.controls.maxPolarAngle = Config.camera.polarAngle;
        // this.controls.setPolarAngle(this._polarAngle);

        this.controls.screenSpacePanning = false;

        Events.listen('controls', (status) => {
            this.controls.enabled = status;
        });

        Storage.set('controls', this);
    }

    set polarAngle(angle) {
        this._polarAngle = angle;
        this.controls.setPolarAngle(angle);
    }

    get polarAngle() {
        return this._polarAngle;
    }
}
