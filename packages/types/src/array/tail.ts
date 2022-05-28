/**
 * @description Array or tuple types delete the first element
 */
 export type Tail<T extends unknown[]> = ((...t: T) => any) extends (
  t: T[0],
  ...r: infer R
  ) => any
  ? R
  : never;
