import type { SceneContext } from './types'

export const createSceneRenderLoop = (context: SceneContext) => {
  const resize = () => {
    if (!context.container || !context.renderer.value || !context.camera.value) return

    context.camera.value.aspect = context.container.clientWidth / context.container.clientHeight
    context.camera.value.updateProjectionMatrix()
    context.renderer.value.setSize(context.container.clientWidth, context.container.clientHeight)
    context.renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  const renderFrame = (timestamp?: number) => {
    if (
      !context.renderer.value ||
      !context.scene.value ||
      !context.camera.value ||
      !context.cube.value ||
      !context.timer
    ) {
      return
    }

    context.timer.update(timestamp)
    const elapsedTime = context.timer.getElapsed()
    context.cube.value.rotation.x = elapsedTime * 0.35
    context.cube.value.rotation.y = elapsedTime * 0.55

    context.controls.value?.update()
    context.renderer.value.render(context.scene.value, context.camera.value)
    context.frameId = window.requestAnimationFrame(renderFrame)
  }

  const start = () => {
    if (context.frameId) return

    renderFrame()
  }

  const stop = () => {
    if (!context.frameId) return

    window.cancelAnimationFrame(context.frameId)
    context.frameId = 0
  }

  const attachResizeListener = () => {
    window.addEventListener('resize', resize)
  }

  const detachResizeListener = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    resize,
    start,
    stop,
    attachResizeListener,
    detachResizeListener,
  }
}
