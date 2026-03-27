import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it } from 'vitest'

import BankManagerModal from './BankManagerModal.vue'
import { useFinanceStore } from '../../../../stores/finance'

afterEach(() => {
  document.body.innerHTML = ''
})

const mountModal = () => {
  const pinia = createPinia()
  const financeStore = useFinanceStore(pinia)

  financeStore.openBankManagerModal()

  return {
    financeStore,
    wrapper: mount(BankManagerModal, {
      global: {
        plugins: [pinia],
        stubs: {
          teleport: true,
        },
      },
    }),
  }
}

describe('BankManagerModal', () => {
  it('renders the required finance fields and insurance actions', () => {
    const { wrapper } = mountModal()

    expect(wrapper.text()).toContain('Bank Manager')
    expect(wrapper.text()).toContain('Hopsital Value')
    expect(wrapper.text()).toContain('Balance')
    expect(wrapper.text()).toContain('Current Loan')
    expect(wrapper.text()).toContain('Interest Payment')
    expect(wrapper.text()).toContain('Inflation Rate')
    expect(wrapper.text()).toContain('Interest Rate')
    expect(wrapper.findAll('button').some((button) => button.text() === 'Open Modal')).toBe(true)
  })

  it('adjusts the current loan reactively with the stepper buttons', async () => {
    const { financeStore, wrapper } = mountModal()

    await wrapper.get('button[aria-label="Increase current loan"]').trigger('click')
    await wrapper.get('button[aria-label="Decrease current loan"]').trigger('click')
    await wrapper.get('button[aria-label="Decrease current loan"]').trigger('click')

    expect(financeStore.form.currentLoan).toBe(39000)
    expect(wrapper.text()).toContain('£39,000')
  })

  it('opens the secondary insurance modal', async () => {
    const { wrapper } = mountModal()

    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Open Modal')
      ?.trigger('click')

    expect(wrapper.text()).toContain('Insurance Record')
    expect(wrapper.text()).toContain('Money Owed')
  })
})
