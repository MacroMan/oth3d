import * as dat from '@macroman/dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import Events from '../util/Events';
import Gp from '../rooms/Gp';
import Storage from '../util/Storage';
import ColorGUIHelper from './ColorGUIHelper';
import Logging from './Logging';
import Floor from './Floor';

let debug;

export default class {
    constructor() {
        debug = this;

        this.scene = Storage.get('scene').scene;
        this.ambientLight = Storage.get('ambientLight');
        this.directionalLight = Storage.get('directionalLight');
        this.floor = new Floor;

        this.stats();
        this.gui();

    }

    static debug() {
        return debug;
    }

    gui() {
        this.gui = new dat.GUI();

        let obj = {
            'GP Office': () => {
                new Gp();
            },
        };

        const buildFolder = this.gui.addFolder('Build rooms');
        buildFolder.open();
        buildFolder.add(obj, 'GP Office');

        const scene = this.gui.addFolder('Scene');
        scene.add(new ColorGUIHelper(this.scene, 'background'), 'value').name('Background color');

        const ambientLight = this.gui.addFolder('Ambient light');
        ambientLight.add(new ColorGUIHelper(this.ambientLight), 'value').name('Color');
        ambientLight.add(this.ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
        // ambientLight.open();

        const directionalLight = this.gui.addFolder('Directional light');
        directionalLight.add(new ColorGUIHelper(this.directionalLight), 'value').name('Color');
        directionalLight.add(this.directionalLight, 'intensity', 0, 2, 0.01).name('Intensity');
        directionalLight.add(this.directionalLight.position, 'x', -5000, 5000, 100);
        directionalLight.add(this.directionalLight.position, 'y', -1000, 10000, 100);
        directionalLight.add(this.directionalLight.position, 'z', -5000, 5000, 100);
        // directionalLight.open();

        const logging = this.gui.addFolder('Logging');
        logging.add(this.floor, 'enabled').name('Floor data');
        logging.add(Logging, 'events');
        logging.add(Logging, 'roomConstruction');

        this.dialog = this.gui.addFolder('Dialog');
        this.dialog.hide();
    }

    stats() {
        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        Events.listen('animate', () => {
            this.stats.update();
        });
    }

    addToDialog(object, property) {
        return this.dialog.add(object, property);
    }

    removeFromDialog(controllers) {
        if (!Array.isArray(controllers)) {
            controllers = [controllers];
        }

        controllers.forEach(controller => {
            this.dialog.remove(controller);
        });
    }

    showDialog() {
        this.dialog.show();
        this.dialog.open();
    }

    hideDialog() {
        this.dialog.hide();
    }
}
