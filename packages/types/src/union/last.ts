import { IntersectOf } from './intersectOf'

/**
 * @description Get the last item of the union type
 * @param U union type
 */
export type Last<U extends unknown> =
    IntersectOf<
        U extends unknown
        ? (x: U) => void
        : never
    > extends (x: infer P) => void
      ? P
      : never    
