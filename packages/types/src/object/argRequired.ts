/**
 * @description Converts some elements in an object to required
 * @param T object
 * @param K keyof T
 */
export type ArgRequired<T extends object, K extends keyof T = keyof T> = _ArgRequired<T, K>

type _ArgRequired<T extends object, K extends keyof T = keyof T, I = Omit<T, K> & Required<Pick<T, K>>> = Pick<I, keyof I>
