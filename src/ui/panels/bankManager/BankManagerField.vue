<template>
  <div class="space-y-2">
    <span class="text-sm font-semibold text-emergency-blue">{{ label }}</span>

    <div v-if="suffix" class="relative">
      <div
        :aria-label="ariaLabel ?? label"
        class="w-full rounded-2xl border-2 border-ui-border bg-white px-4 py-3 text-base shadow-panel"
        :class="suffix ? 'pr-12' : undefined"
      >
        {{ value }}
      </div>
      <span
        class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-semibold text-emergency-blue/70"
      >
        {{ suffix }}
      </span>
    </div>

    <div
      v-else
      :aria-label="ariaLabel ?? label"
      class="w-full rounded-2xl border-2 border-ui-border bg-white px-4 py-3 text-base shadow-panel"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: number | string
    suffix?: string
    ariaLabel?: string
  }>(),
  {
    suffix: undefined,
    ariaLabel: undefined,
  },
)
</script>
