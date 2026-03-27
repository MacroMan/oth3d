import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

import {
  buildBankManagerForm,
  cloneBankManagerForm,
  normalizeNumber,
  type BankManagerForm,
  type BankManagerInitialValue,
} from '../game/ui/panels/bankManager/bankManager'

export const useFinanceStore = defineStore('finance', () => {
  const form = reactive<BankManagerForm>(buildBankManagerForm())
  const initialValue = ref<BankManagerInitialValue | undefined>(undefined)
  const isBankManagerModalOpen = ref(false)
  const activeInsuranceIndex = ref<number | null>(null)

  const totalInsuranceOwed = computed(() =>
    form.insuranceEntries.reduce((sum, entry) => sum + normalizeNumber(entry.moneyOwed), 0),
  )

  const netPosition = computed(
    () =>
      normalizeNumber(form.hospitalValue) +
      normalizeNumber(form.balance) -
      normalizeNumber(form.currentLoan),
  )

  const activeInsuranceEntry = computed(() =>
    activeInsuranceIndex.value === null
      ? null
      : (form.insuranceEntries[activeInsuranceIndex.value] ?? null),
  )

  const activeInsuranceNumber = computed(() =>
    activeInsuranceIndex.value === null ? 1 : activeInsuranceIndex.value + 1,
  )

  const hydrateForm = (value?: BankManagerInitialValue) => {
    initialValue.value = value
    Object.assign(form, buildBankManagerForm(value))
  }

  const openBankManagerModal = (value?: BankManagerInitialValue) => {
    hydrateForm(value)
    isBankManagerModalOpen.value = true
  }

  const closeBankManagerModal = () => {
    isBankManagerModalOpen.value = false
    activeInsuranceIndex.value = null
  }

  const resetForm = () => {
    Object.assign(form, buildBankManagerForm(initialValue.value))
    activeInsuranceIndex.value = null
  }

  const updateCurrentLoan = (value: number | string) => {
    form.currentLoan = typeof value === 'number' ? value : Number(value)
  }

  const openInsuranceModal = (index: number) => {
    activeInsuranceIndex.value = form.insuranceEntries[index] ? index : null
  }

  const closeInsuranceModal = () => {
    activeInsuranceIndex.value = null
  }

  const saveForm = () => cloneBankManagerForm(form)

  return {
    form,
    isBankManagerModalOpen,
    activeInsuranceIndex,
    totalInsuranceOwed,
    netPosition,
    activeInsuranceEntry,
    activeInsuranceNumber,
    hydrateForm,
    openBankManagerModal,
    closeBankManagerModal,
    resetForm,
    updateCurrentLoan,
    openInsuranceModal,
    closeInsuranceModal,
    saveForm,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFinanceStore, import.meta.hot))
}
