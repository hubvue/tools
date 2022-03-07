/**
 * @description primitive value
 */
export type Primitive = string | number | bigint | boolean | null | undefined

/**
 * @description determine if the value is the primitive value
 * @param T unknown
 */
export type IsPrimitive<T extends unknown> = T extends Primitive ? true : false
