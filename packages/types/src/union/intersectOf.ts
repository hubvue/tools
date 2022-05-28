/**
 * @description union to intersection
 */
 export type IntersectOf<T extends unknown> = (
  T extends any ? (arg: T) => void : never
) extends (arg: infer V) => void
  ? V
  : never
