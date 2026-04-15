<template>
  <BaseModal
    :open="open"
    title-id="insurance-entry-title"
    :title="displayName"
    eyebrow="Insurance Record"
    title-tag="h3"
    overlay-class="absolute inset-0 z-50 flex items-center justify-center bg-emergency-black/35 px-4 backdrop-blur-2xs"
    panel-class="w-full max-w-lg rounded-3xl border-4 border-emergency-blue bg-emergency-white p-6 text-ui-text shadow-modal-panel-sm"
    header-class="flex items-start justify-between gap-4"
    title-class="mt-1 font-display text-2xl font-bold text-emergency-blue"
    body-class="mt-5 space-y-4"
    close-button-class="rounded-full border-2 border-emergency-blue px-3 py-1.5 text-sm font-semibold text-emergency-blue"
    @close="emit('close')"
  >
    <BankManagerField label="Insurance Company Name" :value="companyName" />

    <BankManagerField label="Money Owed" :value="moneyOwed" />

    <div class="rounded-2xl border-2 border-ui-border bg-hospital-mint/45 px-4 py-3">
      <p class="text-sm font-semibold text-emergency-blue">
        Current claim exposure: {{ formatBankCurrency(moneyOwed) }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BaseModal from '@ui/panels/BaseModal.vue'
import { formatBankCurrency } from './bankManager'
import BankManagerField from './BankManagerField.vue'

const props = defineProps<{
  open: boolean
  companyName: string
  moneyOwed: number
  entryNumber: number
}>()

const emit = defineEmits<{
  close: []
}>()

const displayName = computed(
  () => props.companyName.trim() || `Insurance Company ${props.entryNumber}`,
)
</script>
