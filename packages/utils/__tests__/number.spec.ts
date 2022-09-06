import { randomNumber } from '../src/number'

describe('number', () => {
  describe('randomNumber', () => {
    test('Produces numbers within the established range', () => {
      const randomGeneratorMock = jest
        .fn()
        .mockReturnValueOnce(0.0001)
        .mockReturnValueOnce(0.13445)
        .mockReturnValueOnce(0.542)
        .mockReturnValueOnce(0.889)
        .mockReturnValueOnce(0.989)

      expect(randomNumber(10, randomGeneratorMock)).toBe(0)
      expect(randomNumber(10, randomGeneratorMock)).toBe(1)
      expect(randomNumber(10, randomGeneratorMock)).toBe(5)
      expect(randomNumber(10, randomGeneratorMock)).toBe(9)
      expect(randomNumber(10, randomGeneratorMock)).toBe(10)
    })
  })
})
