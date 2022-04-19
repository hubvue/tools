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
export type Assign<T extends object, U extends object> = AssignHandler<T, U>
type AssignHandler<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T> & Diff<U, T>> = Pick<I, keyof I>
