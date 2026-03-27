import type { ShallowRef } from 'vue'
import type {
  BoxGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
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
  createFloor: (renderer: WebGLRenderer) => Mesh
  destroyFloor: () => void
}

export type SceneContext = {
  scene: ShallowRef<Scene | null>
  camera: ShallowRef<PerspectiveCamera | null>
  renderer: ShallowRef<WebGLRenderer | null>
  controls: ShallowRef<OrbitControls | null>
  world: ShallowRef<Group | null>
  cube: ShallowRef<Mesh | null>
  floor: ShallowRef<Mesh | null>
  geometry: BoxGeometry | null
  material: MeshStandardMaterial | null
  timer: Timer | null
  container: HTMLDivElement | null
  frameId: number
  activePointerId: number | null
  isRotatingWorld: boolean
  raycaster: Raycaster
  pointer: Vector2
  rotationPivot: Vector3
  dragStart: Vector2
  worldOffset: Vector3
  gameFloor: SceneFloorController
  worldRotationSpeed: number
  worldUpAxis: Vector3
}
