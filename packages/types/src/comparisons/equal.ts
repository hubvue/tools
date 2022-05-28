/**
 * @description Determining two types to be equal
 */
export type Equal<A extends unknown, B extends unknown> = 
  A extends B
    ? B extends A
      ? true
      : false
    : false
