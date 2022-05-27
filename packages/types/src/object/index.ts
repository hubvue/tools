/**
 * @description Filter out the key contained in type U in type T
 * @param T object
 * @param U object
 */
export type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>

/**
 * @description Extracts the intersection of the keys of two objects
 * @param T object
 * @param U object
 */
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>

/**
 * @description Object.assign method simulation, merging two objects
 * @param T object
 * @param U object
 */
export type Assign<T extends object, U extends object> = _Assign<T, U>
type _Assign<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T> & Diff<U, T>> = Pick<I, keyof I>

/**
 * @description Converting an object type to a union type with a single attribute
 * @param T object
 */
export type SingleProperty<T extends object> = {
  [K in keyof T]: {
    [P in K]: T[K]
  }
}[keyof T]
