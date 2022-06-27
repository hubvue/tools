import { hasPrefix } from '../src/string'

describe('string', () => {
  describe('hasPrefix', () => {
    test('Using prefix string to match the original string should return true', () => {
      expect(hasPrefix('@cckim/utils', '@cckim')).toBe(true)
    })
    test('Using non prefix string to match the original string should return false', () => {
      expect(hasPrefix('@cckim/utils', 'utils')).toBe(false)
    })
    test('False should be returned when the length of the current infix string is greater than the matching string', () => {
      expect(hasPrefix('@cckim/utils', '@cckim/utils-test')).toBe(false)
    })
  })
})
