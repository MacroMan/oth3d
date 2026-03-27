<template>
  <div
    class="grid gap-3 rounded-2xl border-2 border-ui-border bg-white p-4 md:grid-cols-[1.2fr_0.9fr_auto]"
  >
    <BankManagerField :label="`Insurance Company ${index + 1}`" :value="companyName" />

    <BankManagerField label="Money Owed" :value="moneyOwed" />

    <div class="flex items-end">
      <button
        type="button"
        class="w-full rounded-xl border-2 border-emergency-blue bg-hospital-blue px-4 py-3 text-sm font-semibold text-emergency-blue transition hover:-translate-y-0.5 md:w-auto"
        @click="emit('open')"
      >
        Open Modal
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BankManagerField from './BankManagerField.vue'

defineProps<{
  index: number
  companyName: string
  moneyOwed: number
}>()

const emit = defineEmits<{
  open: []
}>()
</script>
