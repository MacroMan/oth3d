import { Vector3 } from 'three'

const degToRad = (degrees: number) => (degrees * Math.PI) / 180

type CameraConfig = {
  fieldOfView: number
  near: number
  far: number
  distance: number
  azimuthDegrees: number
  elevationDegrees: number
  target: Vector3
  minDistance: number
  maxDistance: number
}

type LightingConfig = {
  ambient: {
    color: string
    intensity: number
  }
  directional: {
    color: string
    intensity: number
    position: Vector3
  }
}

type FloorConfig = {
  width: number
  depth: number
  tileSize: number
  tileHeight: number
  tileColor: string
}

type WorldConfig = {
  backgroundColor: string
  worldRotationSpeed: number
  camera: CameraConfig
  lighting: LightingConfig
  floor: FloorConfig
}

export const WORLD_CONFIG: WorldConfig = {
  backgroundColor: '#0f172a',
  worldRotationSpeed: 0.005,
  camera: {
    fieldOfView: 60,
    near: 0.1,
    far: 100,
    distance: 9,
    azimuthDegrees: 45,
    elevationDegrees: 45,
    target: new Vector3(0, 0.5, 0),
    minDistance: 4,
    maxDistance: 32,
  },
  lighting: {
    ambient: {
      color: '#ffffff',
      intensity: 0.7,
    },
    directional: {
      color: '#fcd34d',
      intensity: 1.8,
      position: new Vector3(4, 6, 3),
    },
  },
  floor: {
    width: 64,
    depth: 48,
    tileSize: 1,
    tileHeight: 0.02,
    tileColor: '#81745c',
  },
}

export const getInitialCameraPosition = () => {
  const { azimuthDegrees, distance, elevationDegrees, target } = WORLD_CONFIG.camera
  const azimuth = degToRad(azimuthDegrees)
  const elevation = degToRad(elevationDegrees)
  const horizontalDistance = Math.cos(elevation) * distance
  const verticalDistance = Math.sin(elevation) * distance

  return new Vector3(
    target.x + Math.cos(azimuth) * horizontalDistance,
    target.y + verticalDistance,
    target.z + Math.sin(azimuth) * horizontalDistance,
  )
}
