import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  type WebGLRenderer,
} from 'three'

const FLOOR_WIDTH = 64
const FLOOR_DEPTH = 48

export const useGameFloor = () => {
  const textureLoader = new TextureLoader()

  let floor: Mesh<PlaneGeometry, MeshStandardMaterial> | null = null
  let geometry: PlaneGeometry | null = null
  let material: MeshStandardMaterial | null = null
  let texture: Texture | null = null

  const createFloor = (renderer: WebGLRenderer) => {
    texture = textureLoader.load('/corridor.png')
    texture.colorSpace = SRGBColorSpace
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(FLOOR_WIDTH, FLOOR_DEPTH)
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    texture.needsUpdate = true

    geometry = new PlaneGeometry(FLOOR_WIDTH, FLOOR_DEPTH, FLOOR_WIDTH, FLOOR_DEPTH)
    material = new MeshStandardMaterial({
      map: texture,
      metalness: 0.05,
      roughness: 0.85,
    })

    floor = new Mesh(geometry, material)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true

    return floor
  }

  const destroyFloor = () => {
    floor?.removeFromParent()
    floor = null

    geometry?.dispose()
    geometry = null

    material?.dispose()
    material = null

    texture?.dispose()
    texture = null
  }

  return {
    floorSize: {
      width: FLOOR_WIDTH,
      depth: FLOOR_DEPTH,
    },
    createFloor,
    destroyFloor,
  }
}
