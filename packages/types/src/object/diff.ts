/**
 * @description Filter out the key contained in type U in type T
 * @param T object
 * @param U object
 */
 export type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>
