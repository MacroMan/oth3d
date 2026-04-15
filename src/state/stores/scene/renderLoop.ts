import type { SceneContext } from './types'

export const createSceneRenderLoop = (context: SceneContext) => {
  const updateFps = (timestamp: number) => {
    if (context.previousFrameTimestamp === null) {
      context.previousFrameTimestamp = timestamp
      return
    }

    const deltaMs = timestamp - context.previousFrameTimestamp
    context.previousFrameTimestamp = timestamp

    if (deltaMs <= 0) return

    const nextFps = 1000 / deltaMs
    context.fps.value = context.fps.value === 0 ? nextFps : context.fps.value * 0.9 + nextFps * 0.1
  }

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
      !context.timer
    ) {
      return
    }

    context.timer.update(timestamp)
    if (typeof timestamp === 'number') {
      updateFps(timestamp)
    }

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
    context.previousFrameTimestamp = null
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
