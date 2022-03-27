/**
 * @description Converting decimal numbers to N Binary
 * @param value 
 */
type ConvertFn = (value: number) => number | string
const convertHandler = (value: number) => value
export const decimalToN = (value: number, target: number, handler: ConvertFn = convertHandler) => {
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


export const decimalToOctal = (value: number) => decimalToN(value, 8)

export const decimalToHexadecimal = (value: number) => decimalToN(value, 16, (value) => {
  if (value >= 10) {
    return String.fromCharCode(value + 55)
  }
  return value
})

export const decimalToThirtyhex = (value: number) => decimalToN(value, 36, (value) => {
  if (value >= 10) {
    return String.fromCharCode(value + 55)
  }
  return value
})

export const decimalToSixtybinary = (value: number) => decimalToN(value, 62, (value) => {
  switch (true) {
    case value >= 10 && value < 36:
      return String.fromCharCode(value + 55)
    case value >= 36:
      return String.fromCharCode(value + 61)
    default:
      return value
  }
})
