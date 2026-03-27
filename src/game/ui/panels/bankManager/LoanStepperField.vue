<template>
  <div class="space-y-2">
    <span class="text-sm font-semibold text-emergency-blue">{{ label }}</span>

    <div
      class="flex items-center gap-3 rounded-2xl border-2 border-ui-border bg-white p-2 shadow-panel"
    >
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-emergency-blue bg-hospital-peach text-xl font-bold text-emergency-blue transition hover:-translate-y-0.5"
        aria-label="Decrease current loan"
        @click="adjustBy(-step)"
      >
        -
      </button>

      <div
        :aria-label="ariaLabel ?? label"
        class="min-w-0 flex-1 rounded-xl border-2 border-transparent bg-ui-bg px-4 py-3 text-center text-base font-semibold"
      >
        {{ model }}
      </div>

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-emergency-blue bg-hospital-mint text-xl font-bold text-emergency-blue transition hover:-translate-y-0.5"
        aria-label="Increase current loan"
        @click="adjustBy(step)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    step?: number
    ariaLabel?: string
  }>(),
  {
    step: 1000,
    ariaLabel: undefined,
  },
)

const model = defineModel<number>({ required: true })

const setValue = (value: number) => {
  model.value = Math.max(0, Number.isFinite(value) ? value : 0)
}

const adjustBy = (amount: number) => {
  setValue(model.value + amount)
}
</script>
