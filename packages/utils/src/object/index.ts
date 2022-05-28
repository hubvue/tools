import { Value } from '@cckim/types'
/**
 * @description Converting variables to characters via the toString method
 * @param value Variables to be processed
 * @returns 
 */
export const toString = (value: unknown) => Object.prototype.toString.call(value)
/**
 * @description Determine if the property is present on the object
 * @param target 
 * @returns 
 */
export const has = (target: Record<Value.Key, unknown>, key: Value.Key) => {
  if (typeof Reflect !== 'undefined') {
    return Reflect.has(target, key)
  }
  return Object.prototype.hasOwnProperty.call(target, key)
}

/**
 * @description Type-safe Object.keys methods
 * @param obj Object
 * @returns Object peroperty array
 */
export const keys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[]
}
