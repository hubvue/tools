import { runWasm } from '../src'

describe('runWasm', () => {
  test('runWasm', () => {
    expect(runWasm('./add.wasm', [1, 2])).toBe(3)
  })
})
