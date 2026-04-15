import { fireEvent, render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it } from 'vitest'

import BankManagerModal from './BankManagerModal.vue'
import { useFinanceStore } from '@state/stores/finance'

afterEach(() => {
  document.body.innerHTML = ''
})

const mountModal = () => {
  const pinia = createPinia()
  const financeStore = useFinanceStore(pinia)

  financeStore.openBankManagerModal()

  render(BankManagerModal, {
    global: {
      plugins: [pinia],
      stubs: {
        teleport: true,
      },
    },
  })

  return { financeStore }
}

describe('BankManagerModal', () => {
  it('renders the required finance fields and insurance actions', () => {
    mountModal()

    expect(screen.getByText('Bank Manager')).toBeInTheDocument()
    expect(screen.getByText('Hopsital Value')).toBeInTheDocument()
    expect(screen.getByText('Balance')).toBeInTheDocument()
    expect(screen.getByText('Current Loan')).toBeInTheDocument()
    expect(screen.getByText('Interest Payment')).toBeInTheDocument()
    expect(screen.getByText('Inflation Rate')).toBeInTheDocument()
    expect(screen.getByText('Interest Rate')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Open Modal' })).toHaveLength(3)
  })

  it('adjusts the current loan reactively with the stepper buttons', async () => {
    const { financeStore } = mountModal()

    await fireEvent.click(screen.getByRole('button', { name: 'Increase current loan' }))
    await fireEvent.click(screen.getByRole('button', { name: 'Decrease current loan' }))
    await fireEvent.click(screen.getByRole('button', { name: 'Decrease current loan' }))

    expect(financeStore.form.currentLoan).toBe(39000)
    expect(screen.getAllByText('£39,000').length).toBeGreaterThan(0)
  })

  it('opens the secondary insurance modal', async () => {
    mountModal()

    const openButtons = screen.getAllByRole('button', { name: 'Open Modal' })
    expect(openButtons.length).toBeGreaterThan(0)

    await fireEvent.click(openButtons[0]!)

    expect(screen.getByText('Insurance Record')).toBeInTheDocument()
    expect(screen.getAllByText('Money Owed').length).toBeGreaterThan(0)
  })
})
