import { WORLD_CONFIG } from '@scene/worldConfig'
import type { SceneContext } from './types'

export const createSceneInteraction = (context: SceneContext) => {
  const updatePointer = (clientX: number, clientY: number) => {
    if (!context.renderer.value) return false

    const bounds = context.renderer.value.domElement.getBoundingClientRect()
    context.pointer.x = ((clientX - bounds.left) / bounds.width) * 2 - 1
    context.pointer.y = -((clientY - bounds.top) / bounds.height) * 2 + 1

    return true
  }

  const getFloorIntersection = (clientX: number, clientY: number) => {
    if (!context.camera.value || !context.renderer.value || !context.floor.value) return null
    if (!updatePointer(clientX, clientY)) return null

    context.raycaster.setFromCamera(context.pointer, context.camera.value)
    const [intersection] = context.raycaster.intersectObject(context.floor.value, true)
    return intersection ?? null
  }

  const rotateWorldAroundPivot = (angle: number) => {
    if (!context.world.value) return

    context.worldOffset.subVectors(context.world.value.position, context.rotationPivot)
    context.worldOffset.applyAxisAngle(context.worldUpAxis, angle)
    context.world.value.position.copy(context.rotationPivot).add(context.worldOffset)
    context.world.value.rotateY(angle)
  }

  const handleCanvasPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || context.activePointerId !== null) return

    const intersection = getFloorIntersection(event.clientX, event.clientY)
    if (!intersection) return

    context.activePointerId = event.pointerId
    context.isRotatingWorld = true
    context.rotationPivot.copy(intersection.point)
    context.dragStart.set(event.clientX, event.clientY)

    context.renderer.value?.domElement.setPointerCapture(event.pointerId)
  }

  const handleWindowPointerMove = (event: PointerEvent) => {
    if (!context.isRotatingWorld || event.pointerId !== context.activePointerId) return

    const deltaX = event.clientX - context.dragStart.x
    if (deltaX === 0) return

    rotateWorldAroundPivot(deltaX * WORLD_CONFIG.worldRotationSpeed)
    context.dragStart.set(event.clientX, event.clientY)
  }

  const stopWorldRotation = (event: PointerEvent) => {
    if (event.pointerId !== context.activePointerId) return

    context.renderer.value?.domElement.releasePointerCapture(event.pointerId)
    context.activePointerId = null
    context.isRotatingWorld = false
  }

  const attach = () => {
    const canvas = context.renderer.value?.domElement
    if (!canvas) return

    canvas.addEventListener('pointerdown', handleCanvasPointerDown, true)
    window.addEventListener('pointermove', handleWindowPointerMove)
    window.addEventListener('pointerup', stopWorldRotation)
    window.addEventListener('pointercancel', stopWorldRotation)
  }

  const reset = () => {
    context.activePointerId = null
    context.isRotatingWorld = false
  }

  const detach = () => {
    const canvas = context.renderer.value?.domElement

    canvas?.removeEventListener('pointerdown', handleCanvasPointerDown, true)
    window.removeEventListener('pointermove', handleWindowPointerMove)
    window.removeEventListener('pointerup', stopWorldRotation)
    window.removeEventListener('pointercancel', stopWorldRotation)
    reset()
  }

  return {
    attach,
    detach,
  }
}
