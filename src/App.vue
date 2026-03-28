<template>
  <main class="relative h-screen w-screen overflow-hidden bg-stone-950 text-stone-100">
    <div ref="three-container" class="absolute inset-0"></div>

    <section class="pointer-events-none relative z-10 flex h-full items-end p-6 sm:p-10">
      <div class="max-w-md rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md">
        <p class="text-xs font-medium tracking-scene-kicker text-amber-300 uppercase">
          Three.js Scene
        </p>
        <h1 class="mt-3 text-3xl font-semibold text-white">
          Drag from the floor to rotate the world around that point.
        </h1>
        <p class="mt-3 text-sm leading-6 text-stone-300">
          Left-drag the floor to rotate the world. Right-drag to pan the camera while keeping the
          viewing angle fixed.
        </p>
      </div>
    </section>
  </main>

  <UiPanels />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useSceneStore } from './game/state/stores/scene'
import UiPanels from './game/ui/panels/UiPanels.vue'

const threeContainer = useTemplateRef<HTMLDivElement>('three-container')
const sceneStore = useSceneStore()

onMounted(() => {
  if (!threeContainer.value) return

  sceneStore.init(threeContainer.value)
})

onBeforeUnmount(() => {
  sceneStore.destroy()
})
</script>
