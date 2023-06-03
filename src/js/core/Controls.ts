import Events, {EventName} from '../Util/Events';
import {MapControls} from '../Util/OrbitControls';
import {Camera, Vector3} from "three";
import Render from "./Render";
import Config from "../Config";
import Unit from "../Util/Unit";
import {LevelData} from "./LevelTypes";

/**
 * Set up the mouse controls
 */
export default class Controls {
    public readonly controls: MapControls;

    constructor(camera: Camera, render: Render, levelData: LevelData) {
        const lookAt = new Vector3(
            Unit.tileToPixel(Math.floor(levelData.width / 2)),
            0,
            Unit.tileToPixel(Math.floor(levelData.height / 2)),
        );

        this.controls = new MapControls(camera, render.renderer.domElement, lookAt);
        this.controls.enableDamping = Config.controls.damping;
        this.controls.dampingFactor = Config.controls.dampingFactor;
        this.polarAngle = Config.camera.polarAngle;

        Events.listen(EventName.Controls, (status: boolean) => this.controls.enabled = status);
        Events.listen(EventName.ControlsDamping, (status: boolean) => this.controls.enableDamping = status);
        Events.listen(EventName.ControlsZoom, (status: boolean) => this.controls.enableZoom = status);
        Events.listen(EventName.ControlsRotate, (status: boolean) => this.controls.enableRotate = status);
        Events.listen(EventName.ControlsPan, (status: boolean) => this.controls.enablePan = status);
    }

    set polarAngle(angle: number) {
        this.controls.minPolarAngle = this.controls.maxPolarAngle = angle;
        this.controls.setPolarAngle(angle);
    }
}
