import { Primitive } from './primitive'

/**
 * @description determine if the value is the primitive value
 * @param T unknown
 */
 export type IsPrimitive<T extends unknown> = T extends Primitive ? true : false
