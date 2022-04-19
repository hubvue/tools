// Ok return type
interface Ok<T> {
  ok: true,
  value: T
}
// Err return type
interface Err<T> {
  ok: false,
  error: T
}

/**
 * @description Simulation of Rust Result types
 * @param T
 * @param E default undefined type
 */
export type Result<T, E = undefined> = Ok<T> | Err<E | undefined>

/**
 * @description Simulation of Rust Ok functions
 * @param data 
 * @returns 
 */
export const Ok = <T>(data: T): Result<T, never> => {
  return { ok: true, value: data}
}

/**
 * @description Simulation of Rust Err functions
 * @param error 
 * @returns 
 */
export const Err = <E>(error?: E): Result<never, E> => {
  return { ok: false, error }
}
