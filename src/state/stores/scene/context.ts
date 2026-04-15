import { shallowRef } from 'vue'
import { Raycaster, Vector2, Vector3 } from 'three'
import type { SceneContext, SceneFloorController } from './types'

export const createSceneContext = (gameFloor: SceneFloorController): SceneContext => ({
  scene: shallowRef(null),
  camera: shallowRef(null),
  renderer: shallowRef(null),
  controls: shallowRef(null),
  world: shallowRef(null),
  floor: shallowRef(null),
  fps: shallowRef(0),
  timer: null,
  container: null,
  frameId: 0,
  previousFrameTimestamp: null,
  activePointerId: null,
  isRotatingWorld: false,
  raycaster: new Raycaster(),
  pointer: new Vector2(),
  rotationPivot: new Vector3(),
  dragStart: new Vector2(),
  worldOffset: new Vector3(),
  gameFloor,
  worldUpAxis: new Vector3(0, 1, 0),
})
