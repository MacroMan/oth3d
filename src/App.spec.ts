import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'

const init = vi.fn()
const destroy = vi.fn()

vi.mock('./game/state/stores/scene', () => ({
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

    expect(
      screen.getByText('Drag from the floor to rotate the world around that point.'),
    ).toBeInTheDocument()
  })
})
