import gui, {GUI} from "dat.gui";
import ColorGUIHelper from "./ColorGUIHelper";
import TileInspector from "../dialogs/TileInspector";
import Scene from "../core/Scene";
import Level from "../core/Level";
import Controls from "../core/Controls";

export default class Debug {
    private scene: Scene;
    private tileInspector: TileInspector;
    private menu: GUI;
    private controls: Controls;

    constructor(scene: Scene, controls: Controls, level: Level) {
        this.scene = scene;
        this.controls = controls;
        this.tileInspector = new TileInspector(scene, level.matrix);
        this.menu = new gui.GUI();

        this.addSceneMenu();
        this.addAmbientLightMenu();
        this.addDirectionalLightMenu();
        this.addControlsMenu();
        this.addToolsMenu();
    }

    addSceneMenu() {
        const sceneMenu = this.menu.addFolder('Scene');
        sceneMenu.addColor(new ColorGUIHelper(this.scene.scene, 'background'), 'value').name('Background color');
    }

    addAmbientLightMenu() {
        const ambientLightMenu = this.menu.addFolder('Ambient light');
        ambientLightMenu.addColor(new ColorGUIHelper(this.scene.ambientLight), 'value').name('Color');
        ambientLightMenu.add(this.scene.ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
    }

    addDirectionalLightMenu() {
        const directionalLightMenu = this.menu.addFolder('Directional light');
        directionalLightMenu.addColor(new ColorGUIHelper(this.scene.directionalLight), 'value').name('Color');
        directionalLightMenu.add(this.scene.directionalLight, 'intensity', 0, 2, 0.01).name('Intensity');
        directionalLightMenu.add(this.scene.directionalLight.position, 'x', -5000, 5000, 100);
        directionalLightMenu.add(this.scene.directionalLight.position, 'y', -1000, 10000, 100);
        directionalLightMenu.add(this.scene.directionalLight.position, 'z', -5000, 5000, 100);
    }

    addControlsMenu() {
        const controlsMenu = this.menu.addFolder('Controls');
        controlsMenu.add(this.controls.controls, 'enableDamping').name('Damping');
        controlsMenu.add(this.controls.controls, 'dampingFactor').name('Damping factor');
    }

    addToolsMenu() {
        const toolsMenu = this.menu.addFolder('Tools');
        toolsMenu.add(this, 'openTileInspector').name('Tile inspector');
    }

    openTileInspector() {
        this.tileInspector.open();
    }
}
