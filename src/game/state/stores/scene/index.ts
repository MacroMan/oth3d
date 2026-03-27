import { acceptHMRUpdate, defineStore, getActivePinia } from 'pinia'
import { useGameFloor } from '../../../scene/floor/useGameFloor'
import { createSceneContext } from './context'
import { createSceneInteraction } from './interaction'
import { createSceneRenderLoop } from './renderLoop'
import { destroySceneRuntime, initializeSceneRuntime } from './runtime'

export const useSceneStore = defineStore('scene', () => {
  const context = createSceneContext(useGameFloor())
  const renderLoop = createSceneRenderLoop(context)
  const interaction = createSceneInteraction(context)

  const init = (nextContainer: HTMLDivElement) => {
    if (context.container === nextContainer && context.renderer.value) {
      renderLoop.resize()
      return
    }

    destroy()
    initializeSceneRuntime(context, nextContainer)
    renderLoop.attachResizeListener()
    interaction.attach()
    renderLoop.start()
  }

  const destroy = () => {
    renderLoop.detachResizeListener()
    interaction.detach()
    renderLoop.stop()
    destroySceneRuntime(context)
  }

  const refresh = () => {
    if (!context.container) return

    const nextContainer = context.container
    destroy()
    init(nextContainer)
  }

  return {
    scene: context.scene,
    camera: context.camera,
    renderer: context.renderer,
    controls: context.controls,
    world: context.world,
    cube: context.cube,
    floor: context.floor,
    init,
    destroy,
    refresh,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    acceptHMRUpdate(useSceneStore, import.meta.hot)(newModule)

    const pinia = getActivePinia()
    if (!pinia) return

    useSceneStore(pinia).refresh()
  })
}
