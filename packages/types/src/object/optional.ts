/**
 * @description Converting some properties in an object to optional properties
 * @param T object
 * @param K keyof T
 */
export type Optional<T extends object, K extends keyof T = keyof T> = _Optional<T, K>

type _Optional<T extends object, K extends keyof T, I = Omit<T, K> & Partial<Pick<T, K>>> = Pick<I, keyof I>
