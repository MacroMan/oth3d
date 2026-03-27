import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import HudMenu from './HudMenu.vue'
import { useFinanceStore } from '../../../stores/finance'

describe('HudMenu', () => {
  it('opens the finance modal from the dollar button', async () => {
    const pinia = createPinia()
    const financeStore = useFinanceStore(pinia)
    const wrapper = mount(HudMenu, {
      global: {
        plugins: [pinia],
      },
    })

    expect(financeStore.isBankManagerModalOpen).toBe(false)

    await wrapper.get('button[aria-label="Open finance menu"]').trigger('click')

    expect(financeStore.isBankManagerModalOpen).toBe(true)
  })

  it('renders the primary and hover menu labels', () => {
    const wrapper = mount(HudMenu, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Build Rooms')
    expect(wrapper.text()).toContain('Furnish Corridor')
    expect(wrapper.text()).toContain('Edit Room')
    expect(wrapper.text()).toContain('Hire Staff')
    expect(wrapper.text()).toContain('Staff Management')
    expect(wrapper.text()).toContain('Town Map')
    expect(wrapper.text()).toContain('Drug Casebook')
    expect(wrapper.text()).toContain('Research')
    expect(wrapper.text()).toContain('Level Status')
    expect(wrapper.text()).toContain('Charts')
    expect(wrapper.text()).toContain('Policy')
  })
})
