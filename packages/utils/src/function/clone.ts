import { Util } from '@cckim/types'
import { isDate, isObject, isRegExp, isDef } from '../types'

type MapType = WeakMap<Record<Util.Key, unknown>, Record<Util.Key, unknown>>

interface Constructor<T extends unknown> {
  new (...args: unknown[]): T
}

/**
 * @description Clone functions of arbitrary depth
 * @param target Original
 * @param depth Depth of clone
 * @returns 
 */
export const cloneOfDepth = <T extends unknown>(target: T, depth?: number) => cloneOfDepthHandler(target, depth)
const cloneOfDepthHandler = <T extends unknown>(
  target: T,
  depth?: number,
  map: MapType = new WeakMap(),
  currentDepth = 0
) => {
  if (isRegExp(target)) {
    return new RegExp(target)
  }
  if (isDate(target)) {
    return new Date(target)
  }

  if (!isObject(target)) {
    return target
  }

  if (isDef(depth) && currentDepth > depth) {
    return target
  }

  if (map.has(target)) {
    return map.get(target)
  }

  let t = new (target.constructor as Constructor<Record<Util.Key, unknown>>)()

  map.set(target, t)

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      t[key] = cloneOfDepthHandler(target[key], depth, map, currentDepth + 1)
    }
  }
  return t
}
