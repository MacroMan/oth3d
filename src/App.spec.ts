import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

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
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Drag from the floor to rotate the world around that point.')
  })
})
