/**
 * @description Converting an object type to a union type with a single attribute
 * @param T object
 */
 export type SingleProperty<T extends object> = {
  [K in keyof T]: {
    [P in K]: T[K]
  }
}[keyof T]
