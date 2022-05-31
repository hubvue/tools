/**
 * @description Extracts the intersection of the keys of two objects
 * @param T object
 * @param U object
 */
 export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>
