<template>
  <div>
    <BankManagerModal />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import BankManagerModal from './bankManager/BankManagerModal.vue'
import { useFinanceStore } from '../../../stores/finance'

const financeStore = useFinanceStore()

onMounted(() => {
  financeStore.openBankManagerModal()
})
</script>
