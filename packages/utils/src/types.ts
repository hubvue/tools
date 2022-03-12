import { toString } from './converts'
/**
 * @description Determining whether a variable type is undefined
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isUndef = <T extends unknown>(value: T): value is T =>
  value === undefined
/**
 * @description Determining whether a variable type is non-undefined
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isDef = <T extends unknown>(value: T): value is T =>
  value !== undefined
/**
 * @description Determine if the variable type is null
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isNull = <T extends unknown>(value: T): value is T =>
  typeof value === 'object' && !value
/**
 * @description Determine if the variable type is nullable
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isNullable = <T extends unknown>(value: T): value is T =>
  isUndef(value) || isNull(value)
/**
 * @description Determine if the variable type is string
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isString = <T extends unknown>(value: T): value is T =>
  typeof value === 'string'
/**
 * @description Determine if the variable type is number
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isNumber = <T extends unknown>(value: T): value is T =>
  typeof value === 'number'
/**
 * @description Determine if the variable type is boolean
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isBoolean = <T extends unknown>(value: T): value is T =>
  typeof value === 'boolean'
/**
 * @description Determine if the variable type is primitive
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isPrimitive = <T extends unknown>(value: T): value is T =>
  isNullable(value) || isNumber(value) || isBoolean(value) || isString(value)
/**
 * @description Determine if the variable type is symbol
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isSymbol = <T extends unknown>(value: T): value is T =>
  typeof value === 'symbol'
/**
 * @description Determine if the variable type is function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isFunction = <T extends unknown>(value: T): value is T =>
  typeof value === 'function'
/**
 * @description Determine if the variable type is array
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isArray = <T extends unknown>(value: T): value is T =>
  Array.isArray(value)
/**
 * @description Determine if the variable type is object
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isObject = <T extends unknown>(value: T): value is T =>
  toString(value) === '[object Object]'
/**
 * @description Determine if the variable type is regexp
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isRegExp = <T extends unknown>(value: T): value is T =>
  value instanceof RegExp
/**
 * @description Determine if the variable type is date
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isDate = <T extends unknown>(value: T): value is T =>
  value instanceof Date
/**
 * @description Determine if the variable type is error
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isError = <T extends unknown>(value: T): value is T =>
  value instanceof Error
/**
 * @description Determine if the variable type is promise
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isPromise = <T extends unknown>(value: T): value is T =>
  value instanceof Promise

interface PromiseLike {
  then: (
    resolve: (value: any) => any,
    reject?: (reason: any) => any
  ) => PromiseLike
}
/**
 * @description Determine if the variable type is promiseLike
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isPromiseLike = <T extends unknown>(value: T): value is T =>
  (isObject(value) && isFunction((value as PromiseLike).then)) ||
  isPromise(value)
/**
 * @description Determine if the variable type is async function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isAsyncFn = <T extends unknown>(value: T): value is T =>
  toString(value) === '[object AsyncFunction]'
/**
 * @description Determine if the variable type is generator function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isGeneratorFn = <T extends unknown>(value: T): value is T =>
  toString(value) === '[object GeneratorFunction]'

/**
 * @description Determine if the variable type is dummy value
 *               dummy value: isNullable(value) || isNaN(value) || value === 0 || value === '' || value === false
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isDummyValue = <T extends unknown>(value: T): value is T => !value
/**
 *
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isRealValue = <T extends unknown>(value: T): value is T =>
  !isDummyValue(value)
