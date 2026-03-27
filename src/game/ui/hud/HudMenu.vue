<template>
  <section class="pointer-events-auto absolute top-4 left-4 z-20 max-w-full">
    <div
      class="flex flex-wrap items-start gap-2 rounded-[10px] border-2 border-[#1c3a52] bg-[#0e5d88]/95 p-1 shadow-[0_4px_0_#0b2e43]"
    >
      <button
        type="button"
        class="flex h-16 w-16 items-center justify-center rounded-[6px] border-2 border-[#f3d37f] bg-linear-to-b from-[#f6e8aa] to-[#d09a3d] text-[2.7rem] leading-none font-black text-[#0a5c84] shadow-[inset_0_0_0_2px_#fff7cd]"
        aria-label="Open finance menu"
        @click="financeStore.openBankManagerModal()"
      >
        $
      </button>

      <div
        class="flex h-16 min-w-36 flex-col justify-between rounded-[6px] border-2 border-[#f3d37f] bg-[#f1ead0] p-1 shadow-[inset_0_0_0_2px_#fff7cd]"
      >
        <div
          class="grid grid-cols-6 gap-0.5 rounded-[4px] border border-[#494233] bg-[#2e2a22] p-1 text-center font-mono text-[1.45rem] font-bold tracking-[0.08em] text-[#d8d3bf]"
        >
          <span
            v-for="(digit, index) in balanceDigits"
            :key="`${digit}-${index}`"
            class="rounded-[2px] bg-[#171511] px-1 py-0.5"
          >
            {{ digit }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-[0.65rem] font-bold tracking-[0.18em] text-[#8e2342] uppercase"
            >Rep</span
          >
          <div class="h-3 flex-1 rounded-full border border-[#15435d] bg-[#0e2740] p-[1px]">
            <div
              class="h-full rounded-full bg-linear-to-r from-[#ffb347] via-[#f6e36f] to-[#4fda67]"
              :style="{ width: `${reputationPercent}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="flex h-16 w-24 flex-col items-center justify-center rounded-[6px] border-2 border-[#f3d37f] bg-[#f4ecdc] text-[#c5401f] shadow-[inset_0_0_0_2px_#fff7cd]"
      >
        <span class="text-xs font-bold tracking-[0.22em] uppercase">Date</span>
        <span class="mt-1 text-[1.9rem] leading-none font-bold">{{ currentDate }}</span>
      </div>

      <div
        class="flex h-16 items-stretch gap-1 rounded-[6px] border border-[#86dfff]/55 bg-[#106d9f] px-1 py-1"
      >
        <button
          v-for="button in primaryButtons"
          :key="button.label"
          type="button"
          class="flex h-full min-w-14 items-center justify-center rounded-[4px] border border-[#8fe8ff] bg-linear-to-b from-[#37b6df] to-[#11729f] px-3 text-[0.55rem] font-bold tracking-[0.14em] text-[#dff7ff] uppercase shadow-[inset_0_0_0_1px_#83ebff]"
        >
          {{ button.label }}
        </button>
      </div>

      <div class="group relative h-16 min-w-64 flex-1">
        <div
          class="flex h-full items-center rounded-[6px] border border-[#3eb8db] bg-linear-to-b from-[#08131b] to-[#05090d] px-4 text-sm font-bold tracking-[0.12em] text-[#2ca4cf] shadow-[inset_0_0_0_1px_#0f5470]"
        >
          <span>{{ statusMessage }}</span>
        </div>

        <div
          class="pointer-events-none absolute top-full left-0 mt-2 hidden min-w-full grid-cols-7 gap-1 rounded-[6px] border border-[#86dfff]/55 bg-[#106d9f] p-1 group-hover:grid group-hover:pointer-events-auto"
        >
          <button
            v-for="button in secondaryButtons"
            :key="button.label"
            type="button"
            class="flex min-h-14 items-center justify-center rounded-[4px] border border-[#8fe8ff] bg-linear-to-b from-[#37b6df] to-[#11729f] px-2 text-center text-[0.52rem] font-bold tracking-[0.12em] text-[#dff7ff] uppercase shadow-[inset_0_0_0_1px_#83ebff]"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useFinanceStore } from '../../../stores/finance'

const financeStore = useFinanceStore()
const { form } = storeToRefs(financeStore)

const primaryButtons = [
  { label: 'Build Rooms' },
  { label: 'Furnish Corridor' },
  { label: 'Edit Room' },
  { label: 'Hire Staff' },
]

const secondaryButtons = [
  { label: 'Staff Management' },
  { label: 'Town Map' },
  { label: 'Drug Casebook' },
  { label: 'Research' },
  { label: 'Level Status' },
  { label: 'Charts' },
  { label: 'Policy' },
]

const statusMessage = 'Hospital status nominal. Hover for management tools.'
const reputationPercent = 68
const currentDate = '5 Mar'

const balanceDigits = computed(() => {
  const normalized = Math.max(0, Math.trunc(form.value.balance))

  return normalized.toString().padStart(6, '0').slice(-6).split('')
})
</script>
