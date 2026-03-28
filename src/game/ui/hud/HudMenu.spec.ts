import { fireEvent, render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import HudMenu from './HudMenu.vue'
import { useFinanceStore } from '../../../stores/finance'

describe('HudMenu', () => {
  it('opens the finance modal from the dollar button', async () => {
    const pinia = createPinia()
    const financeStore = useFinanceStore(pinia)
    render(HudMenu, {
      global: {
        plugins: [pinia],
      },
    })

    expect(financeStore.isBankManagerModalOpen).toBe(false)

    await fireEvent.click(screen.getByRole('button', { name: 'Open finance menu' }))

    expect(financeStore.isBankManagerModalOpen).toBe(true)
  })

  it('renders the primary and hover menu labels', () => {
    const { container } = render(HudMenu, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(screen.getAllByRole('button', { name: 'Open build rooms menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open furnish corridor menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open edit room menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open hire staff menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open staff management menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open town map menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open drug casebook menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open research menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open level status menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open charts menu' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Open policy menu' }).length).toBeGreaterThan(0)

    const menuIcons = Array.from(container.querySelectorAll('img')).map((image) => image.getAttribute('src'))

    expect(menuIcons).toContain('/assets/ui/hud/menu/finance.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/build-rooms.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/furnish.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/edit-rooms.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/hire-staff.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/staff-management.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/town-map.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/drug-casebook.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/research.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/status.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/charts.png')
    expect(menuIcons).toContain('/assets/ui/hud/menu/policy.png')
  })
})
