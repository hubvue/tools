/**
 * @description Determines if the type exists in an array or tuple type
 * @param T unknown[]
 * @param V unknown
 */
 export type Includes<T extends unknown[], V extends unknown> = V extends T[number] ? true : false
