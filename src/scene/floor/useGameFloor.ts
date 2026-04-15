import {
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  Object3D,
  PlaneGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  type WebGLRenderer,
} from 'three'
import { WORLD_CONFIG } from '@scene/worldConfig'

export const useGameFloor = () => {
  let floor: Group | null = null
  let tileGeometry: PlaneGeometry | null = null
  let tileMaterial: MeshStandardMaterial | null = null
  let tileMesh: InstancedMesh | null = null
  let tileTexture: Texture | null = null
  let hitPlaneGeometry: PlaneGeometry | null = null
  let hitPlaneMaterial: MeshBasicMaterial | null = null
  const tileTransform = new Object3D()
  const textureLoader = new TextureLoader()

  const createFloor = (renderer: WebGLRenderer) => {
    floor = new Group()

    tileGeometry = new PlaneGeometry(WORLD_CONFIG.floor.tileSize, WORLD_CONFIG.floor.tileSize)
    tileTexture = textureLoader.load('/grass.png')
    tileTexture.colorSpace = SRGBColorSpace
    tileTexture.magFilter = NearestFilter
    tileTexture.minFilter = NearestFilter
    tileTexture.anisotropy = renderer.capabilities?.getMaxAnisotropy?.() ?? 1

    tileMaterial = new MeshStandardMaterial({
      map: tileTexture,
      metalness: 0.05,
      roughness: 0.92,
    })

    const xOffset = WORLD_CONFIG.floor.width / 2 - WORLD_CONFIG.floor.tileSize / 2
    const zOffset = WORLD_CONFIG.floor.depth / 2 - WORLD_CONFIG.floor.tileSize / 2
    const tileCount = WORLD_CONFIG.floor.width * WORLD_CONFIG.floor.depth

    tileMesh = new InstancedMesh(tileGeometry, tileMaterial, tileCount)
    tileMesh.receiveShadow = true

    let index = 0

    for (let x = 0; x < WORLD_CONFIG.floor.width; x += 1) {
      for (let z = 0; z < WORLD_CONFIG.floor.depth; z += 1) {
        tileTransform.rotation.set(-Math.PI / 2, 0, 0)
        tileTransform.position.set(x - xOffset, WORLD_CONFIG.floor.tileHeight, z - zOffset)
        tileTransform.updateMatrix()
        tileMesh.setMatrixAt(index, tileTransform.matrix)
        index += 1
      }
    }

    tileMesh.instanceMatrix.needsUpdate = true
    floor.add(tileMesh)

    hitPlaneGeometry = new PlaneGeometry(WORLD_CONFIG.floor.width, WORLD_CONFIG.floor.depth)
    hitPlaneMaterial = new MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })

    const hitPlane = new Mesh(hitPlaneGeometry, hitPlaneMaterial)
    hitPlane.rotation.x = -Math.PI / 2
    hitPlane.userData.floorHitPlane = true
    floor.add(hitPlane)

    return floor
  }

  const destroyFloor = () => {
    floor?.clear()
    floor?.removeFromParent()
    floor = null

    tileMesh = null

    tileGeometry?.dispose()
    tileGeometry = null

    tileTexture?.dispose()
    tileTexture = null

    tileMaterial?.dispose()
    tileMaterial = null

    hitPlaneGeometry?.dispose()
    hitPlaneGeometry = null

    hitPlaneMaterial?.dispose()
    hitPlaneMaterial = null
  }

  return {
    floorSize: {
      width: WORLD_CONFIG.floor.width,
      depth: WORLD_CONFIG.floor.depth,
    },
    createFloor,
    destroyFloor,
  }
}
