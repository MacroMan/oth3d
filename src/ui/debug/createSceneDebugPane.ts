import { Pane } from 'tweakpane'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Vector2, Vector3, type PerspectiveCamera, type WebGLRenderer } from 'three'
import { getInitialCameraPosition, WORLD_CONFIG } from '@scene/worldConfig'

type SceneStore = {
  camera: PerspectiveCamera | null
  controls: OrbitControls | null
  fps: number
  renderer: WebGLRenderer | null
  refresh: () => void
}

const cameraOffset = new Vector3()
const rendererSize = new Vector2()

const normalizeDegrees = (degrees: number) => {
  const wrapped = ((((degrees + 180) % 360) + 360) % 360) - 180
  return wrapped === -180 ? 180 : wrapped
}

const syncConfigFromCamera = (sceneStore: SceneStore) => {
  if (!sceneStore.camera || !sceneStore.controls) return

  cameraOffset.copy(sceneStore.camera.position).sub(sceneStore.controls.target)

  const horizontalDistance = Math.hypot(cameraOffset.x, cameraOffset.z)

  WORLD_CONFIG.camera.fieldOfView = sceneStore.camera.fov
  WORLD_CONFIG.camera.distance = cameraOffset.length()
  WORLD_CONFIG.camera.azimuthDegrees = normalizeDegrees(
    (Math.atan2(cameraOffset.z, cameraOffset.x) * 180) / Math.PI,
  )
  WORLD_CONFIG.camera.elevationDegrees =
    (Math.atan2(cameraOffset.y, horizontalDistance) * 180) / Math.PI
  WORLD_CONFIG.camera.target.copy(sceneStore.controls.target)
}

const syncCameraToConfig = (sceneStore: SceneStore) => {
  if (!sceneStore.camera || !sceneStore.controls) return

  sceneStore.camera.fov = WORLD_CONFIG.camera.fieldOfView
  sceneStore.camera.position.copy(getInitialCameraPosition())
  sceneStore.camera.updateProjectionMatrix()

  sceneStore.controls.minDistance = WORLD_CONFIG.camera.minDistance
  sceneStore.controls.maxDistance = WORLD_CONFIG.camera.maxDistance
  sceneStore.controls.target.copy(WORLD_CONFIG.camera.target)
  sceneStore.controls.update()
}

export const createSceneDebugPane = (container: HTMLElement, sceneStore: SceneStore) => {
  const statsContainer = document.createElement('div')
  statsContainer.className =
    'mb-3 rounded border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white'
  container.appendChild(statsContainer)

  const statDefinitions: Array<[string, string]> = [
    ['FPS', '--'],
    ['Draw Calls', '--'],
    ['Triangles', '--'],
    ['Geometries', '--'],
    ['Textures', '--'],
    ['Pixel Ratio', '--'],
    ['Canvas', '--'],
  ]

  const statsRows: HTMLSpanElement[] = statDefinitions.map(([label, initialValue]) => {
    const row = document.createElement('div')
    row.className = 'mt-1 flex items-center justify-between gap-4 first:mt-0'

    const labelNode = document.createElement('span')
    labelNode.className = 'text-white/60'
    labelNode.textContent = label

    const valueNode = document.createElement('span')
    valueNode.className = 'font-bold'
    valueNode.textContent = initialValue

    row.append(labelNode, valueNode)
    statsContainer.appendChild(row)

    return valueNode
  })

  const pane = new Pane({
    container,
    title: 'Scene Debug',
  })

  const cameraFolder = pane.addFolder({ title: 'Camera', expanded: true })
  cameraFolder.addBinding(WORLD_CONFIG.camera, 'fieldOfView', {
    label: 'Field of View',
    min: 20,
    max: 100,
    step: 1,
  })
  cameraFolder.addBinding(WORLD_CONFIG.camera, 'elevationDegrees', {
    label: 'Camera Angle',
    min: 10,
    max: 80,
    step: 1,
  })
  cameraFolder.addBinding(WORLD_CONFIG.camera.target, 'y', {
    label: 'Elevation',
    min: -4,
    max: 8,
    step: 0.1,
  })
  cameraFolder.addBinding(WORLD_CONFIG.camera, 'minDistance', {
    label: 'Minimum Zoom',
    min: 1,
    max: 24,
    step: 0.5,
  })
  cameraFolder.addBinding(WORLD_CONFIG.camera, 'maxDistance', {
    label: 'Maximum Zoom',
    min: 4,
    max: 64,
    step: 0.5,
  })
  cameraFolder.addBinding(WORLD_CONFIG, 'worldRotationSpeed', {
    label: 'World Rotation Speed',
    min: 0.001,
    max: 0.02,
    step: 0.001,
  })
  const tileHeightBinding = cameraFolder.addBinding(WORLD_CONFIG.floor, 'tileHeight', {
    label: 'Floor Height',
    min: 0,
    max: 0.25,
    step: 0.01,
  })

  let activeControls: OrbitControls | null = null
  let statsFrameId = 0

  const renderStats = () => {
    const renderer = sceneStore.renderer
    const info = renderer?.info

    statsRows[0]!.textContent = Math.round(sceneStore.fps).toString()
    statsRows[1]!.textContent = info?.render.calls.toString() ?? '--'
    statsRows[2]!.textContent = info?.render.triangles.toString() ?? '--'
    statsRows[3]!.textContent = info?.memory.geometries.toString() ?? '--'
    statsRows[4]!.textContent = info?.memory.textures.toString() ?? '--'
    statsRows[5]!.textContent = renderer ? renderer.getPixelRatio().toFixed(2) : '--'
    statsRows[6]!.textContent = renderer
      ? `${renderer.getSize(rendererSize).x}x${rendererSize.y}`
      : '--'

    statsFrameId = window.requestAnimationFrame(renderStats)
  }

  const syncPaneFromScene = () => {
    syncConfigFromCamera(sceneStore)
    pane.refresh()
  }

  const bindControlsListener = () => {
    if (activeControls === sceneStore.controls) return

    activeControls?.removeEventListener('change', syncPaneFromScene)
    activeControls = sceneStore.controls
    activeControls?.addEventListener('change', syncPaneFromScene)
  }

  pane.addButton({ title: 'Refresh Scene' }).on('click', () => {
    sceneStore.refresh()
    bindControlsListener()
    syncPaneFromScene()
    syncCameraToConfig(sceneStore)
  })

  cameraFolder.on('change', () => {
    if (WORLD_CONFIG.camera.minDistance > WORLD_CONFIG.camera.maxDistance) {
      WORLD_CONFIG.camera.maxDistance = WORLD_CONFIG.camera.minDistance
      pane.refresh()
    }

    syncCameraToConfig(sceneStore)
    syncPaneFromScene()
  })

  tileHeightBinding.on('change', () => {
    sceneStore.refresh()
    bindControlsListener()
    syncPaneFromScene()
  })

  bindControlsListener()
  syncPaneFromScene()
  renderStats()

  return () => {
    activeControls?.removeEventListener('change', syncPaneFromScene)
    window.cancelAnimationFrame(statsFrameId)
    statsContainer.remove()
    pane.dispose()
  }
}
