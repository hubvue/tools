import { Key } from '@cckim/types'
import { toString } from './object'
/**
 * @description Determining whether a variable type is undefined
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isUndef = <T extends undefined>(value: unknown): value is T =>
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
export const isNull = <T extends null>(value: unknown): value is T =>
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
export const isString = <T extends string>(value: unknown): value is T =>
  typeof value === 'string'
/**
 * @description Determine if the variable type is number
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isNumber = <T extends number>(value: unknown): value is T =>
  typeof value === 'number'
/**
 * @description Determine if the variable type is boolean
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isBoolean = <T extends boolean>(value: unknown): value is T =>
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
export const isSymbol = <T extends symbol>(value: unknown): value is T =>
  typeof value === 'symbol'
/**
 * @description Determine if the variable type is function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isFunction = <T extends Function>(value: unknown): value is T =>
  typeof value === 'function'
/**
 * @description Determine if the variable type is array
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isArray = <T extends Array<unknown>>(value: unknown): value is T =>
  Array.isArray(value)
/**
 * @description Determine if the variable type is object
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isObject = <T extends Record<Key, unknown>>(value: unknown): value is T =>
  toString(value) === '[object Object]'
/**
 * @description Determine if the variable type is regexp
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isRegExp = <T extends RegExp>(value: unknown): value is T =>
  value instanceof RegExp
/**
 * @description Determine if the variable type is date
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isDate = <T extends Date>(value: unknown): value is T =>
  value instanceof Date
/**
 * @description Determine if the variable type is error
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isError = <T extends Error>(value: unknown): value is T =>
  value instanceof Error
/**
 * @description Determine if the variable type is promise
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isPromise = <T extends Promise<unknown>>(value: unknown): value is T =>
  value instanceof Promise

interface PromiseLike<T extends unknown> {
  then: (
    resolve: (value: T) => any,
    reject?: (reason: any) => any
  ) => PromiseLike<T>
}
/**
 * @description Determine if the variable type is promiseLike
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isPromiseLike = <T extends PromiseLike<unknown>>(value: unknown): value is T =>
  (isObject(value) && isFunction((value as unknown as PromiseLike<unknown>).then)) ||
  isPromise(value)
/**
 * @description Determine if the variable type is async function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isAsyncFn = <T extends AsyncGeneratorFunction>(value: unknown): value is T =>
  toString(value) === '[object AsyncFunction]'
/**
 * @description Determine if the variable type is generator function
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isGeneratorFn = <T extends GeneratorFunction>(value: unknown): value is T =>
  toString(value) === '[object GeneratorFunction]'

/**
 * @description Determine if the variable type is dummy value
 *               dummy value: isNullable(value) || isNaN(value) || value === 0 || value === '' || value === false
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isDummyValue = <T extends unknown>(value: T): value is T => !value
/**
 * @description Determine if the variable type is real value
 * @param value Variables requiring type confirmation
 * @returns
 */
export const isRealValue = <T extends unknown>(value: T): value is T =>
  !isDummyValue(value)
