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
