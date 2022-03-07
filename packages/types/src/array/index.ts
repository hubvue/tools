import { Primitive } from '../'
import { IsPrimitive } from '../utils'
/**
 * @description get subtypes of an array or tuple type
 */
export type Item<T extends unknown[]> = T extends (infer I)[] ? I : never

/**
 * @description get the length of an array or tuple type
 */
export type Length<T extends unknown[]> = T['length']

/**
 * @description get the type of the first child element of an array type
 */
export type ArrayFirst<T extends unknown[]> = ((...t: T) => any) extends ((t: infer F, ...r: T)  => any) ? F : never

/**
 * get the type of the first child element of an tuple type
 */
export type TupleFirst<T extends unknown[]> = T extends [unknown, ...unknown[]] ? T[0] : never

/**
 * @description array or tuple types delete the first element
 */
export type Tail<T extends unknown[]> = ((...t: T) => any) extends (
  t: T[0],
  ...r: infer R
  ) => any
  ? R
  : never;
    
/**
 * @description determine if there are elements left at the end of an array or tuple type
 */
export type HasTail<T extends unknown[]> = T extends ([] | [unknown]) ? false : true

/**
 * @description get the type of the last child element of an array or tuple type
 */
export type Last<T extends unknown[]> = HasTail<T> extends true ? Last<Tail<T>> : ArrayFirst<T>

/**
 * @description array or tuple types delete the last child element type
 */
export type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : never

/**
 * @description add an element to the end of an array or tuple type
 */
export type Push<T extends unknown[], P extends unknown> = [...T, P]

/**
 * @description add an element to the head of an array or tuple type
 */
export type Prepend<T extends unknown[], P extends unknown> = [P, ...T]

/**
 * @description linking Primitive types by a specific hyphen
 * @param T Primitive[]
 * @param H? string
 */
export type Join<T extends Primitive[], H extends string = '', R extends string = ''> = 
  T['length'] extends 0
    ? R
    : HasTail<T> extends true
      ? TupleFirst<T> extends Primitive
        ? Join<Tail<T>, H, `${R}${TupleFirst<T>}${H}`>
        : Join<Tail<T>, H, `${R}${H}`>
    : TupleFirst<T> extends Primitive
      ? `${R}${TupleFirst<T>}`
      : `${R}`