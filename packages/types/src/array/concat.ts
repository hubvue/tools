/**
 * @description Merging two arrays
 * @param T unknown[]
 * @param O unknown[]
 */
 export type Concat<T extends unknown[], O extends unknown[]> = [...T, ...O]
