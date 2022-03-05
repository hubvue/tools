export type First<T extends unknown[]> = ((...t: T) => any) extends (
  t: infer F,
  ...r: T
) => any
  ? F
  : never;

export type Tail<T extends unknown[]> = ((...t: T) => any) extends (
  t: T[0],
  ...r: infer R
) => any
  ? R
  : never;

export type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : never
