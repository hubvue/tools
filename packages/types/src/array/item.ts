/**
 * @description Get subtypes of an array or tuple type
 */
 export type Item<T extends unknown[]> = T extends (infer I)[] ? I : never
