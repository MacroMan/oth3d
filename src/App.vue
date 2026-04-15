<template>
  <main class="relative h-screen w-screen overflow-hidden bg-stone-950 text-stone-100">
    <div ref="three-container" class="absolute inset-0"></div>
    <div
      v-if="showDebugPane"
      ref="debug-pane"
      class="absolute top-6 right-6 bottom-6 z-20 overflow-auto"
    ></div>
  </main>

  <UiPanels />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useSceneStore } from '@state/stores/scene'
import UiPanels from '@ui/panels/UiPanels.vue'

const threeContainer = useTemplateRef<HTMLDivElement>('three-container')
const debugPane = useTemplateRef<HTMLDivElement>('debug-pane')
const sceneStore = useSceneStore()
const showDebugPane = import.meta.env.DEV

let destroyDebugPane: (() => void) | null = null

onMounted(() => {
  if (!threeContainer.value) return

  sceneStore.init(threeContainer.value)

  if (showDebugPane && debugPane.value) {
    void import('@ui/debug/createSceneDebugPane').then(({ createSceneDebugPane }) => {
      if (!debugPane.value) return

      destroyDebugPane = createSceneDebugPane(debugPane.value, sceneStore)
    })
  }
})

onBeforeUnmount(() => {
  destroyDebugPane?.()
  destroyDebugPane = null
  sceneStore.destroy()
})
</script>
