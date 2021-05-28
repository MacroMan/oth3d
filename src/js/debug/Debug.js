import * as dat from '@macroman/dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import Events from '../util/Events';
import Gp from '../rooms/Gp';
import Storage from '../util/Storage';
import ColorGUIHelper from './ColorGUIHelper';

export default class {
    constructor() {
        this.ambientLight = Storage.get('ambientLight');
        this.directionalLight = Storage.get('directionalLight');

        this.stats();
        this.gui();

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
        buildFolder.add(obj, 'GP Office')

        const ambientLight = this.gui.addFolder('Ambient light');
        ambientLight.add(new ColorGUIHelper(this.ambientLight), 'value').name('Color');
        ambientLight.add(this.ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
        // ambientLight.open();

        const directionalLight = this.gui.addFolder('Directional light');
        directionalLight.add(new ColorGUIHelper(this.directionalLight), 'value').name('Color');
        directionalLight.add(this.directionalLight, 'intensity', 0, 2, 0.01).name('Intensity');
        directionalLight.add(this.directionalLight.position, 'x', -5000, 5000, 100);
        directionalLight.add(this.directionalLight.position, 'y', -5000, 5000, 100);
        directionalLight.add(this.directionalLight.position, 'z', -5000, 5000, 100);
        // directionalLight.open();
    }

    stats() {
        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        Events.listen('animate', () => {
            this.stats.update();
        });
    }
}
