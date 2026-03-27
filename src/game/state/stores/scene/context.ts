import { shallowRef } from 'vue'
import { Raycaster, Vector2, Vector3 } from 'three'
import type { SceneContext, SceneFloorController } from './types'

const WORLD_ROTATION_SPEED = 0.005

export const createSceneContext = (gameFloor: SceneFloorController): SceneContext => ({
  scene: shallowRef(null),
  camera: shallowRef(null),
  renderer: shallowRef(null),
  controls: shallowRef(null),
  world: shallowRef(null),
  cube: shallowRef(null),
  floor: shallowRef(null),
  geometry: null,
  material: null,
  timer: null,
  container: null,
  frameId: 0,
  activePointerId: null,
  isRotatingWorld: false,
  raycaster: new Raycaster(),
  pointer: new Vector2(),
  rotationPivot: new Vector3(),
  dragStart: new Vector2(),
  worldOffset: new Vector3(),
  gameFloor,
  worldRotationSpeed: WORLD_ROTATION_SPEED,
  worldUpAxis: new Vector3(0, 1, 0),
})
