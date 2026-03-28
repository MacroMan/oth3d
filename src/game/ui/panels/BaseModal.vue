<template>
  <div v-if="open" :class="overlayClass" @click.self="emit('close')">
    <section :class="panelClass" role="dialog" aria-modal="true" :aria-labelledby="titleId">
      <div :class="headerClass">
        <div>
          <p
            v-if="eyebrow"
            class="text-xs font-semibold tracking-hud-overline text-emergency-blue uppercase"
          >
            {{ eyebrow }}
          </p>
          <component :is="titleTag" :id="titleId" :class="titleClass">
            {{ title }}
          </component>
        </div>

        <button type="button" :class="closeButtonClass" @click="emit('close')">
          {{ closeLabel }}
        </button>
      </div>

      <div :class="bodyClass">
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    open: boolean
    title: string
    titleId: string
    eyebrow?: string
    titleTag?: 'h2' | 'h3'
    overlayClass?: string
    panelClass?: string
    headerClass?: string
    titleClass?: string
    bodyClass?: string
    closeLabel?: string
    closeButtonClass?: string
  }>(),
  {
    eyebrow: undefined,
    titleTag: 'h2',
    overlayClass:
      'fixed inset-0 z-40 flex items-center justify-center bg-emergency-blue/55 px-4 py-8 backdrop-blur-sm',
    panelClass:
      'relative w-full max-w-5xl overflow-hidden rounded-modal-panel border-4 border-emergency-blue bg-ui-bg text-ui-text shadow-modal-panel',
    headerClass:
      'flex items-center justify-between border-b-4 border-emergency-blue bg-linear-to-r from-hospital-blue via-hospital-mint to-hospital-peach px-6 py-5',
    titleClass: 'mt-1 font-display text-3xl font-bold text-emergency-blue',
    bodyClass: 'p-6',
    closeLabel: 'Close',
    closeButtonClass:
      'rounded-full border-2 border-emergency-blue bg-emergency-white px-4 py-2 text-sm font-semibold text-emergency-blue transition hover:-translate-y-0.5 hover:bg-white',
  },
)

const emit = defineEmits<{
  close: []
}>()
</script>
