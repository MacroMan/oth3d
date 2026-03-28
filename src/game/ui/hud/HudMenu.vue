<template>
  <section class="pointer-events-auto absolute top-4 left-4 z-20 max-w-full">
    <div
      class="flex flex-wrap items-start gap-2 rounded-hud-shell border-2 border-hud-shell-border bg-hud-shell/95 p-1 shadow-hud-shell"
    >
      <button
        type="button"
        class="rounded-hud-card border-2 border-hud-gold-border bg-linear-to-b from-hud-gold-top to-hud-gold-bottom shadow-hud-cream-inset transition-transform hover:scale-105"
        aria-label="Open finance menu"
        @click="financeStore.openBankManagerModal()"
      >
        <img
          :src="financeButton.icon"
          alt=""
          aria-hidden="true"
          class="h-16 w-16 rounded-hud-inner object-cover"
        />
      </button>

      <div
        class="flex h-16 min-w-36 flex-col justify-between rounded-hud-card border-2 border-hud-gold-border bg-hud-card p-1 shadow-hud-cream-inset"
      >
        <div
          class="grid grid-cols-6 gap-0.5 rounded-hud-inner border border-hud-display-border bg-hud-display-bg p-1 text-center font-mono text-hud-digits font-bold tracking-hud-digits text-hud-display-text"
        >
          <span
            v-for="(digit, index) in balanceDigits"
            :key="`${digit}-${index}`"
            class="rounded-hud-pixel bg-hud-display-slot px-1 py-0.5"
          >
            {{ digit }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-hud-label text-hud-rep-label uppercase"
            >Rep</span
          >
          <div class="h-3 flex-1 rounded-full border border-hud-rep-track-border bg-hud-rep-track-bg p-px">
            <div
              class="h-full rounded-full bg-linear-to-r from-hud-rep-start via-hud-rep-mid to-hud-rep-end"
              :style="{ width: `${reputationPercent}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="flex h-16 w-24 flex-col items-center justify-center rounded-hud-card border-2 border-hud-gold-border bg-hud-date-bg text-hud-date-text shadow-hud-cream-inset"
      >
        <span class="text-xs font-bold tracking-hud-overline uppercase">Date</span>
        <span class="mt-1 text-hud-date leading-none font-bold">{{ currentDate }}</span>
      </div>

      <div
        class="flex h-16 items-stretch gap-1 rounded-hud-card border border-hud-menu-border/55 bg-hud-menu-bg px-1 py-1"
      >
        <button
          v-for="button in primaryButtons"
          :key="button.label"
          type="button"
          :aria-label="button.ariaLabel"
          class="rounded-hud-inner border border-hud-button-border bg-linear-to-b from-hud-button-top to-hud-button-bottom p-0 shadow-hud-button-inset transition-transform hover:scale-105"
        >
          <img
            :src="button.icon"
            alt=""
            aria-hidden="true"
            class="h-14 min-w-14 rounded-sm object-cover"
          />
        </button>
      </div>

      <div class="group relative h-16 min-w-64 flex-1">
        <div
          class="flex h-full items-center rounded-hud-card border border-hud-status-border bg-linear-to-b from-hud-status-top to-hud-status-bottom px-4 text-sm font-bold tracking-hud-status text-hud-status-text shadow-hud-status-inset"
        >
          <span>{{ statusMessage }}</span>
        </div>

        <div
          class="pointer-events-none absolute top-full left-0 mt-2 hidden min-w-full grid-cols-7 gap-1 rounded-hud-card border border-hud-menu-border/55 bg-hud-menu-bg p-1 group-hover:grid group-hover:pointer-events-auto"
        >
          <button
            v-for="button in secondaryButtons"
            :key="button.label"
            type="button"
            :aria-label="button.ariaLabel"
            class="rounded-hud-inner border border-hud-button-border bg-linear-to-b from-hud-button-top to-hud-button-bottom p-0 shadow-hud-button-inset transition-transform hover:scale-105"
          >
            <img
              :src="button.icon"
              alt=""
              aria-hidden="true"
              class="h-14 w-14 rounded-sm object-cover"
            />
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

const financeButton = {
  icon: '/assets/ui/hud/menu/finance.png',
}

const primaryButtons = [
  {
    label: 'Build Rooms',
    ariaLabel: 'Open build rooms menu',
    icon: '/assets/ui/hud/menu/build-rooms.png',
  },
  {
    label: 'Furnish Corridor',
    ariaLabel: 'Open furnish corridor menu',
    icon: '/assets/ui/hud/menu/furnish.png',
  },
  {
    label: 'Edit Room',
    ariaLabel: 'Open edit room menu',
    icon: '/assets/ui/hud/menu/edit-rooms.png',
  },
  {
    label: 'Hire Staff',
    ariaLabel: 'Open hire staff menu',
    icon: '/assets/ui/hud/menu/hire-staff.png',
  },
]

const secondaryButtons = [
  {
    label: 'Staff Management',
    ariaLabel: 'Open staff management menu',
    icon: '/assets/ui/hud/menu/staff-management.png',
  },
  {
    label: 'Town Map',
    ariaLabel: 'Open town map menu',
    icon: '/assets/ui/hud/menu/town-map.png',
  },
  {
    label: 'Drug Casebook',
    ariaLabel: 'Open drug casebook menu',
    icon: '/assets/ui/hud/menu/drug-casebook.png',
  },
  {
    label: 'Research',
    ariaLabel: 'Open research menu',
    icon: '/assets/ui/hud/menu/research.png',
  },
  {
    label: 'Level Status',
    ariaLabel: 'Open level status menu',
    icon: '/assets/ui/hud/menu/status.png',
  },
  {
    label: 'Charts',
    ariaLabel: 'Open charts menu',
    icon: '/assets/ui/hud/menu/charts.png',
  },
  {
    label: 'Policy',
    ariaLabel: 'Open policy menu',
    icon: '/assets/ui/hud/menu/policy.png',
  },
]

const statusMessage = 'Hospital status nominal. Hover for management tools.'
const reputationPercent = 68
const currentDate = '5 Mar'

const balanceDigits = computed(() => {
  const normalized = Math.max(0, Math.trunc(form.value.balance))

  return normalized.toString().padStart(6, '0').slice(-6).split('')
})
</script>
