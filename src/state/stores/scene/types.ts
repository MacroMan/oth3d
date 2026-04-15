import type { ShallowRef } from 'vue'
import type {
  Group,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type SceneFloorController = {
  createFloor: (renderer: WebGLRenderer) => Object3D
  destroyFloor: () => void
}

export type SceneContext = {
  scene: ShallowRef<Scene | null>
  camera: ShallowRef<PerspectiveCamera | null>
  renderer: ShallowRef<WebGLRenderer | null>
  controls: ShallowRef<OrbitControls | null>
  world: ShallowRef<Group | null>
  floor: ShallowRef<Object3D | null>
  fps: ShallowRef<number>
  timer: Timer | null
  container: HTMLDivElement | null
  frameId: number
  previousFrameTimestamp: number | null
  activePointerId: number | null
  isRotatingWorld: boolean
  raycaster: Raycaster
  pointer: Vector2
  rotationPivot: Vector3
  dragStart: Vector2
  worldOffset: Vector3
  gameFloor: SceneFloorController
  worldUpAxis: Vector3
}
