<template>
  <aside
    class="flex flex-col gap-4 rounded-[24px] border-4 border-emergency-blue bg-emergency-blue p-5 text-emergency-white"
  >
    <div>
      <p class="text-xs font-semibold tracking-[0.22em] text-hospital-mint uppercase">Snapshot</p>
      <h3 class="mt-1 font-display text-2xl font-bold">Treasury Summary</h3>
    </div>

    <div class="grid gap-3">
      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-xs tracking-[0.18em] text-hospital-mint uppercase">Net Position</p>
        <p class="mt-2 text-3xl font-bold">{{ formatBankCurrency(netPosition) }}</p>
      </article>

      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-xs tracking-[0.18em] text-hospital-mint uppercase">Loan Exposure</p>
        <p class="mt-2 text-3xl font-bold">{{ formatBankCurrency(currentLoan) }}</p>
      </article>

      <article class="rounded-2xl bg-white/10 p-4">
        <p class="text-xs tracking-[0.18em] text-hospital-mint uppercase">Interest Due</p>
        <p class="mt-2 text-3xl font-bold">{{ formatBankCurrency(interestPayment) }}</p>
      </article>
    </div>

    <div class="mt-auto grid gap-3 pt-3">
      <button
        type="button"
        class="rounded-2xl border-2 border-emergency-white bg-emergency-white px-4 py-3 font-semibold text-emergency-blue transition hover:-translate-y-0.5"
        @click="emit('save')"
      >
        Save Changes
      </button>
      <button
        type="button"
        class="rounded-2xl border-2 border-white/30 bg-transparent px-4 py-3 font-semibold text-emergency-white transition hover:-translate-y-0.5 hover:bg-white/10"
        @click="emit('reset')"
      >
        Reset
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { formatBankCurrency } from './bankManager'

const props = defineProps<{
  netPosition: number
  currentLoan: number
  interestPayment: number
}>()

const emit = defineEmits<{
  save: []
  reset: []
}>()

const netPosition = computed(() => props.netPosition)
</script>
