import {
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  Timer,
  WebGLRenderer,
} from 'three'
import { getInitialCameraPosition, WORLD_CONFIG } from '@scene/worldConfig'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { SceneContext } from './types'

export const initializeSceneRuntime = (context: SceneContext, container: HTMLDivElement) => {
  context.container = container
  context.fps.value = 0
  context.previousFrameTimestamp = null

  context.scene.value = new Scene()
  context.scene.value.background = new Color(WORLD_CONFIG.backgroundColor)

  context.camera.value = new PerspectiveCamera(
    WORLD_CONFIG.camera.fieldOfView,
    container.clientWidth / container.clientHeight,
    WORLD_CONFIG.camera.near,
    WORLD_CONFIG.camera.far,
  )
  context.camera.value.position.copy(getInitialCameraPosition())

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
  context.controls.value.minDistance = WORLD_CONFIG.camera.minDistance
  context.controls.value.maxDistance = WORLD_CONFIG.camera.maxDistance
  context.controls.value.target.copy(WORLD_CONFIG.camera.target)
  context.controls.value.update()

  const ambientLight = new AmbientLight(
    WORLD_CONFIG.lighting.ambient.color,
    WORLD_CONFIG.lighting.ambient.intensity,
  )
  const directionalLight = new DirectionalLight(
    WORLD_CONFIG.lighting.directional.color,
    WORLD_CONFIG.lighting.directional.intensity,
  )
  directionalLight.position.copy(WORLD_CONFIG.lighting.directional.position)
  context.scene.value.add(ambientLight, directionalLight)

  context.world.value = new Group()
  context.scene.value.add(context.world.value)

  context.floor.value = context.gameFloor.createFloor(context.renderer.value)
  context.world.value.add(context.floor.value)
  context.timer = new Timer()
  context.timer.connect(document)
}

export const destroySceneRuntime = (context: SceneContext) => {
  context.controls.value?.dispose()
  context.controls.value = null

  context.gameFloor.destroyFloor()
  context.floor.value = null

  context.renderer.value?.dispose()
  context.renderer.value?.domElement.remove()
  context.renderer.value = null

  context.world.value?.removeFromParent()
  context.world.value = null
  context.camera.value = null
  context.scene.value = null
  context.fps.value = 0
  context.previousFrameTimestamp = null
  context.timer?.dispose()
  context.timer = null
  context.container = null
}
