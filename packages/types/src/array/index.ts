import { Primitive, Equal } from '../'
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

/**
 * @description determines if the type exists in an array or tuple type
 * @param T unknown[]
 * @param V unknown
 */
export type Includes<T extends unknown[], V extends unknown> = V extends T[number] ? true : false

/**
 * @description determines if the type exists in the array or tuple type, returns the index of the type if it exists, or -1 if it does not.
 * @param T unknown[]
 * @param V unknown
 */
export type Index<T extends unknown[], V extends unknown, P extends unknown[] = []> = 
  Equal<T['length'], 0> extends true
    ? -1
    : Equal<T[0], V> extends true
      ? P['length']
      : Index<Tail<T>, V, [...P, TupleFirst<T>]>