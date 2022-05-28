/**
 * @description Get the type of the first child element of an tuple type
 */
 export type TupleFirst<T extends any[]> = T extends [any, ...any[]] ? T[0] : never
