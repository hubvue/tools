import {
  decimalToN,
  decimalToBinary,
  decimalToOctal,
  decimalToHexadecimal,
  decimalToThirtysix,
  decimalToSixtytwo,
} from '../../src/math/binary-convert'

describe('binary', () => {
  describe('decimalToN', () => {
    test('binary conversion should be correct', () => {
      expect(decimalToN(10086, 2)).toBe('10011101100110')
    })
    test('should return NaN when the parameter is NaN', () => {
      expect(decimalToN(NaN, 2)).toBe(NaN)
    })
    test('should return 0 when the parameter is 0', () => {
      expect(decimalToN(0, 2)).toBe(0)
    })
    test('using Handler conversions should meet expectations', () => {
      expect(
        decimalToN(10086123, 16, (value) => {
          if (value >= 10) {
            return String.fromCharCode(value + 55)
          }
          return value
        })
      ).toBe('99E6EB')
    })
  })

  describe('decimalToBinary', () => {
    test('Converting decimal to binary should meet expectations', () => {
      expect(decimalToBinary(10086)).toBe('10011101100110')
    })
  })

  describe('decimalToOctal', () => {
    test('Converting decimal to octal should meet expectations', () => {
      expect(decimalToOctal(10086)).toBe('23546')
    })
  })

  describe('decimalToHexadecimal', () => {
    test('Converting decimal to hexadecimal should meet expectations', () => {
      expect(decimalToHexadecimal(10086)).toBe('2766')
    })
  })

  describe('decimalToThirtyhex', () => {
    test('Converting decimal to thirtyhex should meet expectations', () => {
      expect(decimalToThirtysix(10086)).toBe('7S6')
    })
  })

  describe('decimalToSixtybinary', () => {
    test('Converting decimal to sixtybinary should meet expectations', () => {
      expect(decimalToSixtytwo(1648372782646)).toBe('tHR2ec')
    })
  })
})
