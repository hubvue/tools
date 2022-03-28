type ConvertFn = (value: number) => number | string
const convert = (value: number) => value
/**
 * @description Converting decimal numbers to N Binary
 * @param value Origin value
 * @param target Target binary
 * @param handler Handling procedures
 */
export const decimalToN = (value: number, target: number, handler: ConvertFn = convert) => {
  if (Number.isNaN(value)) {
    return value
  }
  if (value === 0) {
    return 0
  }

  let result: string = ''
  while (value !== 0) {
    result = `${handler(value % target)}${result}`
    value = (value / target) >> 0
  }
  return result
}
/**
 * @description Converting decimal numbers to binary
 * @param value 
 */
export const decimalToBinary = (value: number) => decimalToN(value, 2)
/**
 * @description Converting decimal numbers to octal
 * @param value Origin value
 * @returns 
 */
export const decimalToOctal = (value: number) => decimalToN(value, 8)
/**
 * @description Converting decimal numbers to hexadecimal
 * @param value Origin value
 * @returns 
 */
export const decimalToHexadecimal = (value: number) => decimalToN(value, 16, (value) => {
  if (value >= 10) {
    return String.fromCharCode(value + 55)
  }
  return value
})

/**
 * @description Converting decimal numbers to Thirtysix
 * @param value Origin value
 * @returns 
 */
export const decimalToThirtysix = (value: number) => decimalToN(value, 36, (value) => {
  if (value >= 10) {
    return String.fromCharCode(value + 55)
  }
  return value
})
/**
 * @description Converting decimal numbers to Sixtytwo
 * @param value Origin value
 * @returns 
 */
export const decimalToSixtytwo = (value: number) => decimalToN(value, 62, (value) => {
  switch (true) {
    case value >= 10 && value < 36:
      return String.fromCharCode(value + 55)
    case value >= 36:
      return String.fromCharCode(value + 61)
    default:
      return value
  }
})


const nonBiraryNumber = (value: string | number) => {
  return false
}
type ReverseConvertFn = (value: string) => number
const reverseConvert = (value: string) => Number(value)
export const ntoDecimal = (value: string, origin: number, handler: ReverseConvertFn = reverseConvert) => {
  if (value === '') {
    return 0
  }
  if (nonBiraryNumber(value)) {
    return 0
  }
  const singleBits = value.split('')
  return singleBits.reduceRight((decimal, bit, index) => {
    const power = singleBits.length - index - 1
    return decimal + (handler(bit) * Math.pow(origin, power))
  }, 0)

}
