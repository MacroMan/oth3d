<template>
  <Teleport to="body">
    <BaseModal
      :open="isBankManagerModalOpen"
      title="Bank Manager"
      title-id="bank-manager-title"
      eyebrow="Finance Console"
      body-class="grid gap-6 p-6 lg:grid-cols-5"
      @close="closeModal"
    >
      <div class="space-y-6 lg:col-span-3">
        <div class="grid gap-4 sm:grid-cols-2">
          <BankManagerField label="Hopsital Value" :value="form.hospitalValue" />

          <BankManagerField label="Balance" :value="form.balance" />

          <LoanStepperField
            label="Current Loan"
            v-model="currentLoan"
            :step="loanStep"
            aria-label="Current Loan"
          />

          <BankManagerField label="Interest Payment" :value="form.interestPayment" />

          <BankManagerField label="Inflation Rate" :value="form.inflationRate" suffix="%" />

          <BankManagerField label="Interest Rate" :value="form.interestRate" suffix="%" />
        </div>

        <div class="rounded-3xl border-4 border-emergency-blue bg-emergency-white/80 p-5">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold tracking-hud-overline text-emergency-blue uppercase">
                Insurance Ledger
              </p>
              <h3 class="mt-1 font-display text-2xl font-bold text-emergency-blue">
                Insurance Companies
              </h3>
            </div>
            <p
              class="rounded-full bg-hospital-lavender px-4 py-2 text-sm font-semibold text-emergency-blue"
            >
              {{ formatBankCurrency(totalInsuranceOwed) }} owed
            </p>
          </div>

          <div class="mt-5 space-y-4">
            <InsuranceCompanyRow
              v-for="(entry, index) in form.insuranceEntries"
              :key="index"
              :index="index"
              :company-name="entry.companyName"
              :money-owed="entry.moneyOwed"
              @open="financeStore.openInsuranceModal(index)"
            />
          </div>
        </div>
      </div>

      <BankManagerSummary
        class="lg:col-span-2"
        :net-position="netPosition"
        :current-loan="form.currentLoan"
        :interest-payment="form.interestPayment"
      />

      <InsuranceEntryModal
        :open="activeInsuranceIndex !== null"
        :company-name="activeInsuranceEntry?.companyName ?? ''"
        :money-owed="activeInsuranceEntry?.moneyOwed ?? 0"
        :entry-number="activeInsuranceNumber"
        @close="financeStore.closeInsuranceModal"
      />
    </BaseModal>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import BaseModal from '@ui/panels/BaseModal.vue'
import BankManagerField from './BankManagerField.vue'
import BankManagerSummary from './BankManagerSummary.vue'
import InsuranceCompanyRow from './InsuranceCompanyRow.vue'
import InsuranceEntryModal from './InsuranceEntryModal.vue'
import LoanStepperField from './LoanStepperField.vue'
import { formatBankCurrency, loanStep } from './bankManager'
import { useFinanceStore } from '@state/stores/finance'

const emit = defineEmits<{
  close: []
}>()

const financeStore = useFinanceStore()
const {
  activeInsuranceEntry,
  activeInsuranceIndex,
  activeInsuranceNumber,
  form,
  isBankManagerModalOpen,
  netPosition,
  totalInsuranceOwed,
} = storeToRefs(financeStore)

const currentLoan = computed({
  get: () => form.value.currentLoan,
  set: (value: number) => {
    financeStore.updateCurrentLoan(value)
  },
})

const closeModal = () => {
  financeStore.closeBankManagerModal()
  emit('close')
}
</script>
