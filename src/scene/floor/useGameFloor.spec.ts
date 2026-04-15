import { describe, expect, it } from 'vitest'
import { Group } from 'three'

import { useGameFloor } from './useGameFloor'

describe('useGameFloor', () => {
  it('destroys a created floor without mutating the child list during traversal', () => {
    const gameFloor = useGameFloor()
    const world = new Group()
    const floor = gameFloor.createFloor({} as never)

    world.add(floor)

    expect(world.children).toContain(floor)
    expect(floor.children.length).toBeGreaterThan(0)

    expect(() => gameFloor.destroyFloor()).not.toThrow()
    expect(world.children).not.toContain(floor)
  })
})
