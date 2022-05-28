/**
 * @description Determine if there are elements left at the end of an array or tuple type
 */
 export type HasTail<T extends unknown[]> = T extends ([] | [unknown]) ? false : true
