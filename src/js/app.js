'use strict';

import Camera from './core/Camera';
import Controls from './core/Controls';
import Scene from './core/Scene';
import Debug from './debug/Debug';
import Render from './core/Render';

// The order of initialising is important
new Camera();
new Scene(); // Relies on Camera()
new Render();
new Controls(); // Relies on Camera() and Render()

new Debug(); // Relies on Scene()

