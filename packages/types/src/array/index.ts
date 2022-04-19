import { Primitive, Equal } from '../'

/**
 * @description Get subtypes of an array or tuple type
 */
export type Item<T extends unknown[]> = T extends (infer I)[] ? I : never

/**
 * @description Get the length of an array or tuple type
 */
export type Length<T extends unknown[]> = T['length']

/**
 * @description Get the type of the first child element of an array type
 */
export type ArrayFirst<T extends unknown[]> = ((...t: T) => any) extends ((t: infer F, ...r: T)  => any) ? F : never

/**
 * @description Get the type of the first child element of an tuple type
 */
export type TupleFirst<T extends unknown[]> = T extends [unknown, ...unknown[]] ? T[0] : never

/**
 * @description Array or tuple types delete the first element
 */
export type Tail<T extends unknown[]> = ((...t: T) => any) extends (
  t: T[0],
  ...r: infer R
  ) => any
  ? R
  : never;
    
/**
 * @description Determine if there are elements left at the end of an array or tuple type
 */
export type HasTail<T extends unknown[]> = T extends ([] | [unknown]) ? false : true

/**
 * @description Get the type of the last child element of an array or tuple type
 */
export type Last<T extends unknown[]> = HasTail<T> extends true ? Last<Tail<T>> : ArrayFirst<T>

/**
 * @description Array or tuple types delete the last child element type
 */
export type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : never

/**
 * @description Add an element to the end of an array or tuple type
 */
export type Push<T extends unknown[], P extends unknown> = [...T, P]

/**
 * @description Add an element to the head of an array or tuple type
 */
export type Prepend<T extends unknown[], P extends unknown> = [P, ...T]

/**
 * @description Linking Primitive types by a specific hyphen
 * @param T Primitive[]
 * @param H? string
 */
export type Join<T extends Primitive[], H extends string = ''> = JoinHandler<T, H>
type JoinHandler<T extends Primitive[], H extends string = '', R extends string = ''> = 
  T['length'] extends 0
    ? R
    : HasTail<T> extends true
      ? TupleFirst<T> extends Primitive
        ? JoinHandler<Tail<T>, H, `${R}${TupleFirst<T>}${H}`>
        : JoinHandler<Tail<T>, H, `${R}${H}`>
    : TupleFirst<T> extends Primitive
      ? `${R}${TupleFirst<T>}`
      : `${R}`


/**
 * @description Determines if the type exists in an array or tuple type
 * @param T unknown[]
 * @param V unknown
 */
export type Includes<T extends unknown[], V extends unknown> = V extends T[number] ? true : false


/**
 * @description Determines if the type exists in the array or tuple type, returns the index of the type if it exists, or -1 if it does not.
 * @param T unknown[]
 * @param V unknown
 */
export type Index<T extends unknown[], V extends unknown> = IndexHandler<T, V>
type IndexHandler<T extends unknown[], V extends unknown, P extends unknown[] = []> = 
  Equal<T['length'], 0> extends true
    ? -1
    : Equal<T[0], V> extends true
      ? P['length']
      : IndexHandler<Tail<T>, V, [...P, TupleFirst<T>]>


/**
 * @description Get the array or tuple type [Start, End) section
 * @param T unknown[]
 * @param S number?
 * @param E number?
 */
export type Slice<T extends unknown[], S extends number = 0, E extends number = T['length']> = SliceHandler<T, S, E>
type SliceHandler<
  T extends unknown[],
  S extends number,
  E extends number,
  P extends unknown[] = [],
  R extends unknown[] = []
> = Equal<P['length'], S> extends true
      ? Equal<P['length'], E> extends true
        ? R
        : SliceHandler<Tail<T>, S, E, [...P, TupleFirst<T>], [...R, TupleFirst<T>]>
      : Equal<R['length'], 0> extends true
        ? SliceHandler<Tail<T>, S, E, [...P, TupleFirst<T>], R>
        : Equal<P['length'], E> extends true
          ? R
          : SliceHandler<Tail<T>, S, E, [...P, TupleFirst<T>], [...R, TupleFirst<T>]>

/**
 * @description Merging two arrays
 * @param T unknown[]
 * @param O unknown[]
 */
export type Concat<T extends unknown[], O extends unknown[]> = [...T, ...O]

/**
 * @description Array flattening
 * @param T unknown[]
 */
export type Flat<T extends unknown[]> = FlatHandler<T>
type FlatHandler<T extends unknown[], R extends unknown[] = []> = 
  Length<T> extends 0
    ? R
    : TupleFirst<T> extends unknown[]
      ? FlatHandler<Tail<T>, [...R, ...FlatHandler<TupleFirst<T>>]>
      : FlatHandler<Tail<T>, [...R, TupleFirst<T>]>

/**
 * @description Filter out F-compatible types in array types
 * @param T unknown[]
 * @param F unknown
 */
export type Filter<T extends unknown[], F extends unknown> = FilterHandler<T, F>
export type FilterHandler<T extends unknown[], F extends unknown, R extends unknown[] = []> = 
  Length<T> extends 0
    ? R
    : TupleFirst<T> extends F
      ? FilterHandler<Tail<T>, F, [...R, TupleFirst<T>]>
      : FilterHandler<Tail<T>, T, R>

/**
 * @description Array type inversion
 * @param T unknown[]
 */
export type Reverse<T extends unknown[]> = Length<T> extends 0 ? [] : [...Reverse<Tail<T>>, TupleFirst<T>]

/**
 * @description Returns true when the types in the array are all F-compatible, otherwise false
 * @param T unknown[]
 * @param F unknown
 */
export type Every<T extends unknown[], F extends unknown> = 
  Length<T> extends 0
    ? true
    : TupleFirst<T> extends F
      ? Every<Tail<T>, F>
      : false

/**
 * @description Returns true when any of the types in the array are compatible with the F type, otherwise false
 * @param T unknown[]
 * @param F unknown
 */
export type Some<T extends unknown[], F extends unknown> = 
  Length<T> extends 0
    ? false
    : TupleFirst<T> extends F
      ? true
      : Some<Tail<T>, F>

/**
 * @description Converts numbers into an array of equal length and fills it with the appropriate type
 * @param T number
 * @param F unknown
 */
export type NumToArray<T extends number, F extends unknown = ''> = NumToArrayHandler<T, F>
type NumToArrayHandler<T extends number, F extends unknown, R extends F[] = []> = 
  R['length'] extends T
    ? R
    : NumToArrayHandler<T, F, [...R, F]>
