/**
 * @description Determining two types to be equal
 */
export type Equal<A extends unknown, B extends unknown> = 
  A extends B
    ? B extends A
      ? true
      : false
    : false

/**
 * @description Determining that two types are strictly equal
 */
export type StrictlyEqual<X extends unknown, Y extends unknown> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false
