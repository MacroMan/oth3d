'use strict';

import Camera from './core/Camera';
import Controls from './core/Controls';
import Scene from './core/Scene';
import Render from './core/Render';
import level01 from './levels/01.json';
import Level from "./core/Level";
import AnimationLoop from "./core/AnimationLoop";
import Debug from "./debug/Debug";

const camera = new Camera();
const scene = new Scene(camera);
const render = new Render();
const controls = new Controls(camera.camera, render, level01);
new AnimationLoop(camera.camera, scene, render.renderer, controls.controls);

const level = new Level(scene, level01);

new Debug(scene, controls, level);
