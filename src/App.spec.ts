import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'

const init = vi.fn()
const destroy = vi.fn()

vi.mock('@state/stores/scene', () => ({
  useSceneStore: () => ({
    init,
    destroy,
  }),
}))

import App from './App.vue'

describe('App', () => {
  beforeEach(() => {
    init.mockReset()
    destroy.mockReset()
  })

  it('renders the scene instructions', () => {
    render(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(screen.getByRole('button', { name: 'Open finance menu' })).toBeInTheDocument()
    expect(screen.getByText('Hospital status nominal. Hover for management tools.')).toBeInTheDocument()
  })
})
