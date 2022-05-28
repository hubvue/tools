/**
 * @description Get the type of the first child element of an array type
 */
 export type ArrayFirst<T extends unknown[]> = ((...t: T) => any) extends ((t: infer F, ...r: T)  => any) ? F : never
