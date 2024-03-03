import { describe, test, expectTypeOf, expect } from 'vitest'

describe('Graph Tests', () => {
  test('should say graph', () => {
    expectTypeOf('Graph').toBeString()
    expect('Graph').toEqual('Graph')
  })
})
