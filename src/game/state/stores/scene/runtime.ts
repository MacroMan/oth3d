import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Timer,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { SceneContext } from './types'

export const initializeSceneRuntime = (context: SceneContext, container: HTMLDivElement) => {
  context.container = container

  context.scene.value = new Scene()
  context.scene.value.background = new Color('#0f172a')

  context.camera.value = new PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  )
  context.camera.value.position.set(4.5, 6.86, 4.5)

  context.renderer.value = new WebGLRenderer({ antialias: true })
  context.renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  context.renderer.value.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(context.renderer.value.domElement)

  context.controls.value = new OrbitControls(
    context.camera.value,
    context.renderer.value.domElement,
  )
  context.controls.value.enableDamping = false
  context.controls.value.enablePan = true
  context.controls.value.enableRotate = false
  context.controls.value.screenSpacePanning = false
  context.controls.value.minDistance = 4
  context.controls.value.maxDistance = 32
  context.controls.value.target.set(0, 0.5, 0)
  context.controls.value.update()

  const ambientLight = new AmbientLight('#ffffff', 0.7)
  const directionalLight = new DirectionalLight('#fcd34d', 1.8)
  directionalLight.position.set(4, 6, 3)
  context.scene.value.add(ambientLight, directionalLight)

  context.world.value = new Group()
  context.scene.value.add(context.world.value)

  context.geometry = new BoxGeometry(1.4, 1.4, 1.4)
  context.material = new MeshStandardMaterial({
    color: '#f59e0b',
    metalness: 0.2,
    roughness: 0.15,
  })
  context.cube.value = new Mesh(context.geometry, context.material)
  context.cube.value.position.y = 0.7
  context.world.value.add(context.cube.value)

  context.floor.value = context.gameFloor.createFloor(context.renderer.value)
  context.world.value.add(context.floor.value)
  context.timer = new Timer()
  context.timer.connect(document)
}

export const destroySceneRuntime = (context: SceneContext) => {
  context.controls.value?.dispose()
  context.controls.value = null

  context.geometry?.dispose()
  context.geometry = null

  context.material?.dispose()
  context.material = null

  context.gameFloor.destroyFloor()
  context.floor.value = null

  context.renderer.value?.dispose()
  context.renderer.value?.domElement.remove()
  context.renderer.value = null

  context.world.value?.removeFromParent()
  context.world.value = null
  context.cube.value = null
  context.camera.value = null
  context.scene.value = null
  context.timer?.dispose()
  context.timer = null
  context.container = null
}
